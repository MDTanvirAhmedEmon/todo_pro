export type TodoStatus = "todo" | "in_progress" | "done";
export type TodoPriority = "low" | "medium" | "high";

export interface ITodo {
  id: string;
  userId: string;
  title: string;
  description?: string;
  status: TodoStatus;
  priority?: TodoPriority;
  tags: string[];
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}
