/* eslint-disable @typescript-eslint/no-explicit-any */
import { http, HttpResponse } from "msw";
import { v4 as uuid } from "uuid";

type User = { id: string; name: string; email: string; password: string };
type TokenInfo = { token: string; userId: string; expiresAt: number };
type Todo = {
  id: string;
  userId: string;
  title: string;
  description?: string;
  status: "todo" | "in_progress" | "done";
  priority?: "low" | "medium" | "high";
  tags?: string[];
  dueDate?: string | null;
  createdAt: string;
  updatedAt: string;
};
function loadFromStorage<T>(key: string, fallback: T): T {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : fallback;
}

function saveToStorage<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

const users: User[] = loadFromStorage("mock_users", []);
const tokens: TokenInfo[] = loadFromStorage("mock_tokens", []);
const todos: Todo[] = loadFromStorage("mock_todos", []);


// Helpers
// const randomFailure = (failureRate = 0.60) => Math.random() < failureRate;

function createToken(userId: string, ttlMs = 1000 * 60 * 60) {
  const token = uuid();
  const expiresAt = Date.now() + ttlMs;
  tokens.push({ token, userId, expiresAt });
  saveToStorage("mock_tokens", tokens);
  return { token, expiresAt };
}

function findUserByToken(req: any) {
  const authHeader = req.headers.get("authorization") || "";
  if (!authHeader.startsWith("Bearer ")) return null;
  const token = authHeader.replace("Bearer ", "");
  const info = tokens.find((t) => t.token === token);
  if (!info) return null;
  if (Date.now() > info.expiresAt) {
    const idx = tokens.findIndex((t) => t.token === token);
    if (idx !== -1) tokens.splice(idx, 1);
    return null;
  }
  return users.find((u) => u.id === info.userId) || null;
}

export const handlers = [

  http.post("/auth/register", async ({ request }) => {
    const body = await request.json() as { name: string; email: string; password: string };
    const { name, email, password } = body;

    if (!email || !password) {
      return HttpResponse.json({ message: "Email and password required" }, { status: 400 });
    }
    if (users.some((u) => u.email === email)) {
      return HttpResponse.json({ message: "User already exists" }, { status: 400 });
    }

    const newUser: User = { id: uuid(), name, email, password };
    users.push(newUser);
    saveToStorage("mock_users", users);

    const { token, expiresAt } = createToken(newUser.id);

    return HttpResponse.json(
      { token, expiresAt, user: { id: newUser.id, email: newUser.email, name: newUser.name } },
      { status: 201 }
    );
  }),

  http.post("/auth/login", async ({ request }) => {
    const requestBody = await request.json() as { email: string; password: string };
    console.log('from ', requestBody);
    const { email, password } = requestBody;

    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) return HttpResponse.json({ message: "Invalid credentials" }, { status: 400 });

    const { token, expiresAt } = createToken(user.id);
    return HttpResponse.json({ token, expiresAt, user: { id: user.id, email: user.email, name: user.name } });
  })
  ,

  // GET TODOS

  http.get("/todos", async ({ request }) => {

    console.log(request);
    const user = findUserByToken(request);
    if (!user) return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    const url = new URL(request.url, window.location.origin);
    console.log(url);

    const search = url.searchParams.get("search") || "";
    const status = url.searchParams.get("status") || "";
    const priority = url.searchParams.get("priority") || "";
    const sortBy = url.searchParams.get("sortBy") || "createdAt";
    const order = (url.searchParams.get("order") || "desc").toLowerCase();
    const page = Number(url.searchParams.get("page") || "1");
    const limit = Number(url.searchParams.get("limit") || "10");

    let list = todos.filter((t) => t.userId === user.id);

    if (search) {
      const s = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.title.toLowerCase().includes(s) ||
          (t.description || "").toLowerCase().includes(s)
      );
    }

    if (status) {
      list = list.filter((t) => t.status === status);
    }

    if (priority) {
      list = list.filter((t) => t.priority === priority);
    }

    list.sort((a, b) => {
      const aVal = a[sortBy as keyof Todo] ?? "";
      const bVal = b[sortBy as keyof Todo] ?? "";
      if (aVal < bVal) return order === "asc" ? -1 : 1;
      if (aVal > bVal) return order === "asc" ? 1 : -1;
      return 0;
    });

    const total = list.length;
    const start = (page - 1) * limit;
    const paged = list.slice(start, start + limit);

    const totalTodo = list.filter((t) => t.status === "todo").length;
    const totalInProgress = list.filter((t) => t.status === "in_progress").length;
    const totalDone = list.filter((t) => t.status === "done").length;
    saveToStorage("mock_todos", todos);

    return HttpResponse.json({
      data: paged,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      stats: {
        todo: totalTodo,
        in_progress: totalInProgress,
        done: totalDone,
      },
    });
  }),
  
  // GET SINGLE TODO
  http.get("/todos/:id", async ({ request, params }) => {
    const user = findUserByToken(request);
    if (!user) return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { id } = params as { id: string };
    const todo = todos.find((t) => t.id === id && t.userId === user.id);

    if (!todo) return HttpResponse.json({ message: "Todo not found" }, { status: 404 });

    return HttpResponse.json(todo);
  }),

  // CREATE TODO
  http.post("/todos", async ({ request }) => {
    // const requestBody = await request.json() as { email: string; password: string };
    const user = findUserByToken(request);
    if (!user) return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await request.json() as Partial<Todo>;
    // if (randomFailure(0.50)) return HttpResponse.json({ message: "Failed to create todo" }, { status: 400 });

    const newTodo: Todo = {
      id: uuid(),
      userId: user.id,
      title: body.title || "Untitled",
      description: body.description || "",
      status: body.status || "todo",
      priority: body.priority || "medium",
      tags: body.tags || [],
      dueDate: body.dueDate || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    todos.push(newTodo);
    saveToStorage("mock_todos", todos);
    return HttpResponse.json(newTodo, { status: 201 });
  }),

  // PATCH TODO
  http.patch("/todos/:id", async ({ request, params }) => {
    const user = findUserByToken(request);
    if (!user) return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });

    const { id } = params as { id: string };
    const body = await request.json() as Partial<Todo>;
    const idx = todos.findIndex((t) => t.id === id && t.userId === user.id);

    if (idx === -1) return HttpResponse.json({ message: "Not found" }, { status: 404 });
    // if (randomFailure(0.05)) return HttpResponse.json({ message: "Update failed" }, { status: 500 });

    todos[idx] = { ...todos[idx], ...body, updatedAt: new Date().toISOString() };
    return HttpResponse.json(todos[idx]);
  }),

  // DELETE TODO
  http.delete("/todos/:id", async ({ request, params }) => {
    const user = findUserByToken(request);
    if (!user) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { id } = params as { id: string };
    const idx = todos.findIndex((t) => t.id === id && t.userId === user.id);

    if (idx === -1) {
      return HttpResponse.json({ message: "Not found" }, { status: 404 });
    }
    todos.splice(idx, 1);
    saveToStorage("mock_todos", todos);

    return HttpResponse.json({ message: "Deleted" });
  }),
];