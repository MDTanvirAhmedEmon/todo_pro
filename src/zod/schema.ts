import { z } from "zod"

export const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const todoSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    status: z.enum(["todo", "in_progress", "done"], {
        message: "Status is required",
    }),
    priority: z.enum(["low", "medium", "high"], {
        message: "Priority is required",
    }),
    tags: z.string().min(1, "Tags are required"),
    dueDate: z.string().min(1, "Due date is required"),
});