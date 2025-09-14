/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../redux/features/auth/authSlice";
import CreateNewTodo from "../components/CreateNewTodo";
import { useCreateTodoMutation } from "../redux/features/todos/todosApi";
import toast from "react-hot-toast";

// Mock the API hook
vi.mock("../redux/features/todos/todosApi", () => ({
    useCreateTodoMutation: vi.fn(),
}));

// Mock toast
vi.mock("react-hot-toast", () => {
    return {
        default: {
            success: vi.fn(),
            error: vi.fn(),
        },
    };
});

describe("CreateNewTodo Component", () => {
    let mockCreateTodo: any;

    beforeEach(() => {
        mockCreateTodo = vi.fn().mockReturnValue({
            unwrap: vi.fn().mockResolvedValue({ id: "1", title: "Test Todo" }),
            isLoading: false,
        });
        (useCreateTodoMutation as any).mockReturnValue([mockCreateTodo, { isLoading: false }]);

        const store = configureStore({
            reducer: {
                logInUser: authReducer,
            },
        });

        render(
            <Provider store={store}>
                <CreateNewTodo />
            </Provider>
        );
    });

    it("opens form, fills it, submits, and calls createTodo", async () => {
        const user = userEvent.setup();

        // Open the form
        const addButton = screen.getByRole("button", { name: /add todo/i });
        await user.click(addButton);

        // Fill inputs
        await user.type(screen.getByLabelText(/title \*/i), "Test Todo");
        await user.type(screen.getByLabelText(/description/i), "Test description");
        await user.selectOptions(screen.getByLabelText(/status/i), "in_progress");
        await user.selectOptions(screen.getByLabelText(/priority/i), "high");
        await user.type(screen.getByLabelText(/tags/i), "tag1, tag2");
        await user.type(screen.getByLabelText(/due date/i), "2025-09-20");

        // Submit form
        const submitButton = screen.getByRole("button", { name: /create todo/i });
        await user.click(submitButton);

        // Wait for API call
        await waitFor(() => {
            expect(mockCreateTodo).toHaveBeenCalledWith({
                title: "Test Todo",
                description: "Test description",
                status: "in_progress",
                priority: "high",
                tags: ["tag1", "tag2"],
                dueDate: "2025-09-20",
            });
            expect(toast.success).toHaveBeenCalledWith("Todo Created Successfully");
        });
    });
});
