import TodoCart from "../../components/TodoCart";
import type { ITodo } from "../../global/todoType";

const Home = () => {

    const todos: ITodo[] = [
        {
            "id": "1",
            "userId": "u101",
            "title": "Finish React Project",
            "description": "Complete the frontend of the Todo app with Tailwind styling.",
            "status": "in_progress",
            "priority": "high",
            "tags": ["react", "tailwind", "frontend"],
            "dueDate": "2025-09-20",
            "createdAt": "2025-09-10T08:30:00Z",
            "updatedAt": "2025-09-10T08:30:00Z"
        },
        {
            "id": "2",
            "userId": "u101",
            "title": "Write API Documentation",
            "description": "Add usage examples and endpoint details for the backend API.",
            "status": "todo",
            "priority": "medium",
            "tags": ["docs", "backend"],
            "dueDate": "2025-09-22",
            "createdAt": "2025-09-11T10:15:00Z",
            "updatedAt": "2025-09-11T10:15:00Z",
        },
        {
            "id": "3",
            "userId": "u102",
            "title": "Team Meeting",
            "description": "Discuss project progress and assign new tasks.",
            "status": "done",
            "priority": "low",
            "tags": ["meeting", "planning"],
            "dueDate": "2025-09-12",
            "createdAt": "2025-09-09T15:00:00Z",
            "updatedAt": "2025-09-09T15:00:00Z",
        },
        {
            "id": "4",
            "userId": "u103",
            "title": "Fix Login Bug",
            "description": "Resolve issue where users can’t log in after session expiry.",
            "status": "in_progress",
            "priority": "high",
            "tags": ["bug", "auth"],
            "dueDate": "2025-09-15",
            "createdAt": "2025-09-11T12:00:00Z",
            "updatedAt": "2025-09-11T12:00:00Z",
        }
    ]


    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <section className="py-8" aria-labelledby="stats-heading">
                <h2 id="stats-heading" className="sr-only">
                    Todo Statistics
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 shadow-sm">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-500">Total Todos</h3>
                        <p className="text-xl sm:text-2xl font-bold text-purple-600">8</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 shadow-sm">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-500">To Do</h3>
                        <p className="text-xl sm:text-2xl font-bold text-purple-600">5</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 shadow-sm">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-500">In Progress</h3>
                        <p className="text-xl sm:text-2xl font-bold text-purple-600">2</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 shadow-sm">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-500">Completed</h3>
                        <p className="text-xl sm:text-2xl font-bold text-purple-600">1</p>
                    </div>
                </div>
            </section>
            <section className="bg-white border border-gray-200 rounded-lg p-4 space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h3 className="text-lg font-medium text-gray-900">Filter & Search</h3>
                    <div className="text-sm text-gray-500">
                        Showing 8 of 8 todos
                        <button className="ml-2 text-purple-600 hover:underline">
                            Clear filters
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="lg:col-span-2">
                        <label htmlFor="search" className="block text-sm font-medium text-gray-900 mb-1">
                            Search
                        </label>
                        <input
                            id="search"
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Search todos..."
                        />
                    </div>
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-gray-900 mb-1">
                            Status
                        </label>
                        <select
                            id="status"
                            className="w-full px-3 py-2 cursor-pointer border border-gray-300 rounded-md bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                            <option value="all">All Status</option>
                            <option value="todo">To Do</option>
                            <option value="in_progress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="priority" className="block text-sm font-medium text-gray-900 mb-1">
                            Priority
                        </label>
                        <select
                            id="priority"
                            className="w-full px-3 py-2 cursor-pointer border border-gray-300 rounded-md bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                            <option value="all">All Priorities</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="sort" className="block text-sm font-medium text-gray-900 mb-1">
                            Sort By
                        </label>
                        <div className="flex gap-1">
                            <select
                                id="sort"
                                className="w-full px-3 py-2 cursor-pointer border border-gray-300 rounded-md bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            >
                                <option value="createdAt">Created</option>
                                <option value="dueDate">Due Date</option>
                                <option value="priority">Priority</option>
                                <option value="title">Title</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white border border-gray-200 rounded-lg px-4 py-6 space-y-4 shadow-sm mt-8">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 ">
                    <h2 className="text-lg font-medium text-purple-600">
                        Create New Todo
                    </h2>
                    <button
                        className="bg-purple-600 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors w-full sm:w-auto"
                        aria-controls="todo-form"
                    >
                        Add Todo
                    </button>
                </div>
            </section>

            <section className="pt-8">

                {
                    todos?.map((todo: ITodo) =>
                    <TodoCart key={todo?.id} todo={todo} ></TodoCart>
                    )
                }

            </section>
        </div>
    );
};

export default Home;