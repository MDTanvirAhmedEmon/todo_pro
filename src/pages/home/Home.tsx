/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import CreateNewTodo from "../../components/CreateNewTodo";
import TodoCart from "../../components/TodoCart";
import type { ITodo } from "../../global/todoType";
import { useGetTodoQuery } from "../../redux/features/todos/todosApi";
import TodoCartSkeleton from "../../skeleton/TodoCartSkeleton";

const Home = () => {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");
    const [priority, setPriority] = useState("all");
    const [sortBy, setSortBy] = useState("createdAt");
    const [order, setOrder] = useState<"asc" | "desc">("desc");
    const [page, setPage] = useState(1);
    const limit = 10;

    const queryParams: Record<string, string | number> = {
        search,
        sortBy,
        order,
        page,
        limit,
    };
    if (status !== "all") queryParams.status = status;
    if (priority !== "all") queryParams.priority = priority;

    const { data, isLoading } = useGetTodoQuery(queryParams);

    const todos: ITodo[] = data?.data || [];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <section className="py-8" aria-labelledby="stats-heading">
                <h2 id="stats-heading" className="sr-only">
                    Todo Statistics
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 shadow-sm">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-500">Total Todos</h3>
                        <p className="text-xl sm:text-2xl font-bold text-purple-600">{data?.total}</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 shadow-sm">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-500">To Do</h3>
                        <p className="text-xl sm:text-2xl font-bold text-purple-600">
                            {todos.filter((t) => t.status === "todo").length}
                        </p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 shadow-sm">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-500">In Progress</h3>
                        <p className="text-xl sm:text-2xl font-bold text-purple-600">
                            {todos.filter((t) => t.status === "in_progress").length}
                        </p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 shadow-sm">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-500">Completed</h3>
                        <p className="text-xl sm:text-2xl font-bold text-purple-600">
                            {todos.filter((t) => t.status === "done").length}
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-white border border-gray-200 rounded-lg p-4 space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h3 className="text-lg font-medium text-gray-900">Filter & Search</h3>
                    <div className="text-sm text-gray-500">
                        Showing {todos.length} of {data?.total} todos
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
                            value={search}
                            onChange={(e) => {
                                setPage(1);
                                setSearch(e.target.value);
                            }}
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
                            value={status}
                            onChange={(e) => {
                                setPage(1);
                                setStatus(e.target.value);
                            }}
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
                            value={priority}
                            onChange={(e) => {
                                setPage(1);
                                setPriority(e.target.value);
                            }}
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
                        <select
                            id="sort"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full px-3 py-2 cursor-pointer border border-gray-300 rounded-md bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                            <option value="createdAt">Created</option>
                            <option value="dueDate">Due Date</option>
                            <option value="priority">Priority</option>
                            <option value="title">Title</option>
                        </select>
                    </div>
                </div>
            </section>

            <CreateNewTodo />
            {
                isLoading ?
                    <section className="pt-8">
                        <TodoCartSkeleton></TodoCartSkeleton>
                        <TodoCartSkeleton></TodoCartSkeleton>
                        <TodoCartSkeleton></TodoCartSkeleton>
                    </section>
                    :
                    <section className="pt-8">
                        {todos?.map((todo: ITodo) => (
                            <TodoCart key={todo?.id} todo={todo} />
                        ))}
                    </section>
            }

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-6 mb-10">
                <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer "
                >
                    Prev
                </button>
                <span>
                    Page {page} of {data?.totalPages}
                </span>
                <button
                    disabled={page === data?.totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-3 py-1 border rounded disabled:opacity-50 cursor-pointer "
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Home;