import type { ITodo } from "../global/todoType";

const TodoCart = ({ todo }: { todo: ITodo }) => {
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

  return (
    <div className="mb-8">
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all">
        <div className="flex items-start justify-between mb-2">
          <h3
            className={`font-medium ${
              todo?.status === "done"
                ? "line-through text-gray-500"
                : "text-gray-900"
            }`}
          >
            {todo?.title}
          </h3>
          <div className="flex items-center gap-2 ml-4">
            <button className="text-gray-600 cursor-pointer hover:text-gray-900 text-sm transition-colors">
              Edit
            </button>
            <button className="text-red-600 cursor-pointer hover:text-red-700 text-sm transition-colors">
              Delete
            </button>
          </div>
        </div>

        {todo.description && (
          <p
            className={`text-sm mb-3 ${
              todo?.status === "done"
                ? "line-through text-gray-500"
                : "text-gray-600"
            }`}
          >
            {todo?.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <div className="relative">
            <select
              value={todo.status}
              className={`text-xs px-2 py-1 rounded-full border cursor-pointer ${getStatusColor(
                todo.status
              )} focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all`}
            >
              <option value="todo">To Do</option>
              <option value="in_progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          {todo.priority && (
            <span
              className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(
                todo.priority
              )}`}
            >
              {todo.priority.charAt(0).toUpperCase() +
                todo.priority.slice(1)}{" "}
              Priority
            </span>
          )}

          {todo.dueDate && (
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
              Due: {new Date(todo.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>

        {todo.tags && todo.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {todo.tags.map((tag: string, index: number) => (
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
          {todo.updatedAt !== todo?.createdAt && (
            <span className="ml-2">
              Updated: {new Date(todo?.updatedAt).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoCart;