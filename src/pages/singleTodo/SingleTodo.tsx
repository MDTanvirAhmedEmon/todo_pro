import { useParams, Link } from "react-router-dom";
import { useGetSingleTodoQuery } from "../../redux/features/todos/todosApi";
import SingleTodoSkeleton from "../../skeleton/SingleTodoSkeleton";

const SingleTodo = () => {
    const { id } = useParams<{ id: string }>();
    const { data: todoData, isLoading } = useGetSingleTodoQuery(id);
    const todo = todoData;

    if (isLoading) {
        return <SingleTodoSkeleton />;
    }

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-10">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm transition-colors">
                <div className="flex justify-between items-start mb-4">
                    <h1
                        className={`text-xl font-semibold ${
                            todo?.status === "done"
                                ? "line-through text-gray-500 dark:text-gray-400"
                                : "text-gray-900 dark:text-gray-100"
                        }`}
                    >
                        {todo?.title}
                    </h1>
                </div>

                {todo?.description && (
                    <p
                        className={`mb-3 ${
                            todo?.status === "done"
                                ? "line-through text-gray-500 dark:text-gray-400"
                                : "text-gray-600 dark:text-gray-300"
                        }`}
                    >
                        {todo?.description.slice(0, 100)}
                        {todo?.description.length > 100 ? "..." : ""}
                    </p>
                )}

                <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span
                        className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(
                            todo?.status
                        )}`}
                    >
                        {todo?.status}
                    </span>
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
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
                            Due: {new Date(todo?.dueDate).toLocaleDateString()}
                        </span>
                    )}
                </div>

                {todo?.tags && todo?.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                        {todo?.tags.map((tag: string, i: number) => (
                            <span
                                key={i}
                                className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full border border-purple-200 dark:border-purple-700"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className="text-xs text-gray-500 dark:text-gray-400">
                    Created: {new Date(todo?.createdAt).toLocaleDateString()}
                    {todo?.updatedAt !== todo?.createdAt && (
                        <span className="ml-2">
                            Updated:{" "}
                            {new Date(todo?.updatedAt).toLocaleDateString()}
                        </span>
                    )}
                </div>

                <Link
                    to="/app/todos"
                    className="inline-block mt-4 text-purple-600 dark:text-purple-400 hover:underline"
                >
                    Back to Todos
                </Link>
            </div>
        </div>
    );
};

const getPriorityColor = (priority?: string) => {
    switch (priority) {
        case "high":
            return "text-red-600 bg-red-50 dark:bg-red-900 dark:text-red-300 border-red-200 dark:border-red-700";
        case "medium":
            return "text-yellow-600 bg-yellow-50 dark:bg-yellow-900 dark:text-yellow-300 border-yellow-200 dark:border-yellow-700";
        case "low":
            return "text-green-600 bg-green-50 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-700";
        default:
            return "text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600";
    }
};

const getStatusColor = (status?: string) => {
    switch (status) {
        case "done":
            return "text-green-600 bg-green-50 dark:bg-green-900 dark:text-green-300 border-green-200 dark:border-green-700";
        case "in_progress":
            return "text-blue-600 bg-blue-50 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-700";
        case "todo":
            return "text-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600";
        default:
            return "text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600";
    }
};

export default SingleTodo;