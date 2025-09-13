import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RxCross2 } from "react-icons/rx";
import { todoSchema } from "../zod/schema";
import { useCreateTodoMutation } from "../redux/features/todos/todosApi";
import toast, { Toaster } from "react-hot-toast";

type TodoFormValues = z.infer<typeof todoSchema>;

const CreateNewTodo = () => {
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [createTodo, { isLoading }] = useCreateTodoMutation()
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TodoFormValues>({
        resolver: zodResolver(todoSchema),
    });

    const onSubmit = (data: TodoFormValues) => {
        const formattedData = {
            ...data,
            tags: data.tags
                ? data.tags.split(",").map(tag => tag.trim()).filter(tag => tag !== "")
                : [],
        };
        console.log("Form Data:", formattedData);

        createTodo(formattedData).unwrap()
            .then(() => {
                toast.success("Todo Created Successfully")
                reset();
                setShowCreateForm(false);
            })
            .catch((error) => {
                toast.error(error?.data?.message)
            })
    };

    return (
        <section className="bg-white border border-gray-200 rounded-lg px-4 py-6 space-y-4 shadow-sm mt-8">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h2 className="text-lg font-medium text-purple-600">Create New Todo</h2>
                <button
                    onClick={() => setShowCreateForm(true)}
                    className="bg-purple-600 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors w-full sm:w-auto"
                    aria-controls="todo-form"
                >
                    Add Todo
                </button>
            </div>

            {showCreateForm && (
                <div className="fixed inset-0 bg-black/50 flex items-start md:items-center justify-center z-50 overflow-auto py-8">
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mx-4 w-full max-w-lg animate-in zoom-in-95">
                        <div className="text-black flex justify-end">
                            <RxCross2
                                size={25}
                                className="cursor-pointer"
                                onClick={() => setShowCreateForm(false)}
                            />
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Title *
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    {...register("title")}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="Enter todo title"
                                />
                                {errors.title && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    {...register("description")}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                                    placeholder="Enter todo description (optional)"
                                    rows={3}
                                />
                                {errors.description && (
                                    <p className="text-red-600 text-sm mt-1">
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="status"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Status
                                    </label>
                                    <select
                                        id="status"
                                        {...register("status")}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    >
                                        <option value="todo">To Do</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="done">Done</option>
                                    </select>
                                    {errors.status && (
                                        <p className="text-red-600 text-sm mt-1">
                                            Status is required
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="priority"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Priority
                                    </label>
                                    <select
                                        id="priority"
                                        {...register("priority")}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                    {errors.priority && (
                                        <p className="text-red-600 text-sm mt-1">
                                            Priority is required
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label
                                        htmlFor="tags"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Tags
                                    </label>
                                    <input
                                        id="tags"
                                        type="text"
                                        {...register("tags")}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        placeholder="Enter tags separated by commas"
                                    />
                                    {errors.tags && (
                                        <p className="text-red-600 text-sm mt-1">
                                            {errors.tags.message}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="dueDate"
                                        className="block text-sm font-medium text-gray-700 mb-1"
                                    >
                                        Due Date
                                    </label>
                                    <input
                                        id="dueDate"
                                        type="date"
                                        {...register("dueDate")}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    />
                                    {errors.dueDate && (
                                        <p className="text-red-600 text-sm mt-1">
                                            {errors.dueDate.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-2 pt-2">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
                                >
                                    {isLoading ? "loading..." : "Create Todo"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default CreateNewTodo;