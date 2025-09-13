import { useState } from "react";
import type { ITodo } from "../global/todoType";
import EditTodoForm from "./EditTodoForm";
import { useDeleteTodoMutation } from "../redux/features/todos/todosApi";
import toast, { Toaster } from "react-hot-toast";

const TodoCart = ({ todo }: { todo: ITodo }) => {
    const [selectedTodo, setSelectedTodo] = useState<ITodo>()
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [showEditForm, setShowEditForm] = useState(false)

    const [deleteTodo, { isLoading }] = useDeleteTodoMutation()

    const handleDeleteTodo = () => {
        deleteTodo(todo?.id).unwrap()
            .then(() => {
                toast.success("Todo Deleted Successfully")
                setShowDeleteConfirm(false)
            })
            .catch((error) => {
                toast.error(error?.data?.message)
            })
    }

    const getPriorityColor = (priority?: ITodo["priority"]) => {
        switch (priority) {
            case "high":
                return "text-red-600 bg-red-50 border-red-200";
            case "medium":
                return "text-yellow-600 bg-yellow-50 border-yellow-200";
            case "low":
                return "text-green-600 bg-green-50 border-green-200";
            default:
                return "text-gray-600 bg-gray-100 border-gray-200";
        }
    };

    const getStatusColor = (status: ITodo["status"]) => {
        switch (status) {
            case "done":
                return "text-green-600 bg-green-50 border-green-200";
            case "in_progress":
                return "text-blue-600 bg-blue-50 border-blue-200";
            case "todo":
                return "text-gray-600 bg-gray-50 border-gray-200";
        }
    };

    const handelEdit = (todo: ITodo) => {
        setSelectedTodo(todo)
        setShowEditForm(true)
    }

    return (
        <div className="mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-grab">
                <Toaster position="top-center" reverseOrder={false} />
                <div className="flex items-start justify-between mb-2">
                    <h3
                        className={`font-medium ${todo?.status === "done"
                            ? "line-through text-gray-500"
                            : "text-gray-900"
                            }`}
                    >
                        {todo?.title}
                    </h3>
                    <div className="flex items-center gap-2 ml-4">
                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // stop drag from interfering
                                handelEdit(todo);
                            }}
                            className="text-gray-600 cursor-pointer hover:text-gray-900 text-sm transition-colors"
                        >
                            Edit
                        </button>

                        <button
                            onClick={(e) => {
                                e.stopPropagation(); // stop drag from interfering
                                setShowDeleteConfirm(true);
                            }}
                            className="text-red-600 cursor-pointer hover:text-red-700 text-sm transition-colors"
                        >
                            Delete
                        </button>
                    </div>

                </div>

                {todo?.description && (
                    <p
                        className={`text-sm mb-3 ${todo?.status === "done"
                            ? "line-through text-gray-500"
                            : "text-gray-600"
                            }`}
                    >
                        {todo?.description}
                    </p>
                )}

                <div className="flex flex-wrap items-center gap-2 mb-3">
                    <div className="">
                        <span
                            className={`text-xs px-2 py-1 rounded-full border cursor-pointer ${getStatusColor(
                                todo.status
                            )} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
                        >
                            {todo?.status}
                        </span>
                    </div>
                    {todo?.priority && (
                        <span
                            className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(
                                todo?.priority
                            )}`}
                        >
                            {todo?.priority.charAt(0).toUpperCase() +
                                todo?.priority.slice(1)}{" "}
                            Priority
                        </span>
                    )}

                    {todo?.dueDate && (
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                            Due: {new Date(todo?.dueDate).toLocaleDateString()}
                        </span>
                    )}
                </div>

                {todo?.tags && todo?.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                        {todo?.tags?.map((tag: string, index: number) => (
                            <span
                                key={index}
                                className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full border border-purple-200"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className="text-xs text-gray-500">
                    Created: {new Date(todo?.createdAt).toLocaleDateString()}
                    {todo?.updatedAt !== todo?.createdAt && (
                        <span className="ml-2">
                            Updated: {new Date(todo?.updatedAt).toLocaleDateString()}
                        </span>
                    )}
                </div>
            </div>
            {showDeleteConfirm &&
                <div className="fixed inset-0 bg-black/50 flex items-start md:items-center justify-center z-50 overflow-auto py-8">
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mx-4 w-full max-w-lg animate-in zoom-in-95">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            Delete Todo
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            Are you sure you want to delete? This action cannot be undone.
                        </p>
                        <div className="flex gap-2">
                            <button
                                disabled={isLoading}
                                onClick={handleDeleteTodo}
                                className="bg-red-600 text-white px-4 py-2 cursor-pointer rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                            >
                                {isLoading ? "Loading..." : "Delete"}
                            </button>
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="bg-gray-200 dark:bg-gray-600 text-gray-900 cursor-pointer dark:text-white px-4 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            }
            {
                showEditForm &&
                <EditTodoForm setShowEditForm={setShowEditForm} selectedTodo={selectedTodo}></EditTodoForm>
            }
        </div >
    );
};

export default TodoCart;