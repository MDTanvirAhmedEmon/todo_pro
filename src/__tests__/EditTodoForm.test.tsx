import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import EditTodoForm from "../components/EditTodoForm";
import type { ITodo } from "../global/todoType";

vi.mock("react-hot-toast", () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockUpdateTodo = vi.fn(() => ({
  unwrap: () => Promise.resolve(),
}));
vi.mock("../redux/features/todos/todosApi", () => ({
  useUpdateTodoMutation: () => [mockUpdateTodo, { isLoading: false }],
}));

const selectedTodo: ITodo = {
  id: "1",
  userId: "user1",
  title: "Test Todo",
  description: "This is a test",
  status: "todo",
  priority: "medium",
  tags: ["tag1", "tag2"],
  dueDate: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const renderComponent = (props = {}) =>
  render(
    <Provider store={store}>
      <EditTodoForm
        selectedTodo={selectedTodo}
        setShowEditForm={vi.fn()}
        {...props}
      />
    </Provider>
  );

describe("EditTodoForm", () => {
  beforeEach(() => {
    mockUpdateTodo.mockReset();
  });

  it("renders the form with default values", () => {
    renderComponent();

    expect(screen.getByDisplayValue("Test Todo")).toBeInTheDocument();
    expect(screen.getByDisplayValue("This is a test")).toBeInTheDocument();
    expect(screen.getByDisplayValue("To Do")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Medium")).toBeInTheDocument();
    expect(screen.getByDisplayValue("tag1,tag2")).toBeInTheDocument();

    const dueDateInput = screen.getByLabelText(/due date/i) as HTMLInputElement;
    expect(dueDateInput.value).toBe(selectedTodo.dueDate!.split("T")[0]);
  });

  it("calls updateTodo mutation on submit", async () => {
    renderComponent();

    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: "Updated Title" } });

    const submitBtn = screen.getByRole("button", { name: /update todo/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockUpdateTodo).toHaveBeenCalledWith({
        id: selectedTodo.id,
        data: {
          title: "Updated Title",
          description: selectedTodo.description,
          status: selectedTodo.status,
          priority: selectedTodo.priority,
          tags: selectedTodo.tags,
          dueDate: selectedTodo.dueDate!.split("T")[0],
        },
      });
    });
  });

  it("shows validation errors if title is empty", async () => {
    renderComponent();

    const titleInput = screen.getByLabelText(/title/i);
    fireEvent.change(titleInput, { target: { value: "" } });

    const submitBtn = screen.getByRole("button", { name: /update todo/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText(/title is required/i)).toBeInTheDocument();
    });
  });
});
