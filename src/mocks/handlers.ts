/* eslint-disable @typescript-eslint/no-explicit-any */
// src/mocks/handlers.ts
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
  updatedAt?: string;
};

const users: User[] = [];
const tokens: TokenInfo[] = [];
const todos: Todo[] = [];

function createToken(userId: string, ttlMs = 1000 * 60 * 60) {
  const token = uuid();
  const expiresAt = Date.now() + ttlMs;
  tokens.push({ token, userId, expiresAt });
  return { token, expiresAt };
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

    const { token, expiresAt } = createToken(newUser.id);

    return HttpResponse.json(
      { token, expiresAt, user: { id: newUser.id, email: newUser.email } },
      { status: 201 }
    );
  }),

  http.post("/auth/login", async ({ request }) => {
    const requestBody = await request.json() as { email: string; password: string };
    console.log('from ', requestBody);
    const { email, password } = requestBody;

    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) return HttpResponse.json({ message: "Invalid credentials" }, { status: 401 });

    const { token, expiresAt } = createToken(user.id);
    return HttpResponse.json({ token, expiresAt, user: { id: user.id, email: user.email } });
  })
  ,
];
