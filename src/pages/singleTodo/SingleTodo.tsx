import { useParams, Link } from "react-router-dom";
import { useGetSingleTodoQuery } from "../../redux/features/todos/todosApi";
import SingleTodoSkeleton from "../../skeleton/SingleTodoSkeleton";

const SingleTodo = () => {
    const { id } = useParams<{ id: string }>();
    const { data: todoData, isLoading } = useGetSingleTodoQuery(id);
    const todo = todoData;

    if (isLoading) {
        return (
            <SingleTodoSkeleton></SingleTodoSkeleton>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-10">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                    <h1 className={`text-xl font-semibold ${todo?.status === "done" ? "line-through text-gray-500" : "text-gray-900"}`}>
                        {todo?.title}
                    </h1>

                </div>

                {todo?.description && (
                    <p className={`text-gray-600 mb-3 ${todo?.status === "done" ? "line-through text-gray-500" : ""}`}>
                        {todo?.description.slice(0, 100)}{todo?.description.length > 100 ? "..." : ""}
                    </p>
                )}

                <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(todo?.status)}`}>
                        {todo?.status}
                    </span>
                    {todo?.priority && (
                        <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(todo?.priority)}`}>
                            {todo?.priority.charAt(0).toUpperCase() + todo?.priority.slice(1)} Priority
                        </span>
                    )}
                    {todo?.dueDate && (
                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                            Due: {new Date(todo?.dueDate).toLocaleDateString()}
                        </span>
                    )}
                </div>

                {todo?.tags && todo?.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                        {todo?.tags.map((tag: string, i: number) => (
                            <span key={i} className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full border border-purple-200">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className="text-xs text-gray-500">
                    Created: {new Date(todo?.createdAt).toLocaleDateString()}
                    {todo?.updatedAt !== todo?.createdAt && (
                        <span className="ml-2">Updated: {new Date(todo?.updatedAt).toLocaleDateString()}</span>
                    )}
                </div>

                <Link to="/app/todos" className="inline-block mt-4 text-purple-600 hover:underline">
                    Back to Todos
                </Link>
            </div>

        </div>
    );
};

const getPriorityColor = (priority?: string) => {
    switch (priority) {
        case "high": return "text-red-600 bg-red-50 border-red-200";
        case "medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
        case "low": return "text-green-600 bg-green-50 border-green-200";
        default: return "text-gray-600 bg-gray-100 border-gray-200";
    }
};

const getStatusColor = (status?: string) => {
    switch (status) {
        case "done": return "text-green-600 bg-green-50 border-green-200";
        case "in_progress": return "text-blue-600 bg-blue-50 border-blue-200";
        case "todo": return "text-gray-600 bg-gray-50 border-gray-200";
        default: return "text-gray-600 bg-gray-100 border-gray-200";
    }
};

export default SingleTodo;
