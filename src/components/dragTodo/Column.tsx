import {
    useDroppable,
} from "@dnd-kit/core";

import type { ITodo } from "../../global/todoType";
import DraggableTodo from "./DraggableTodo";
const Column = ({ id, label, todos }: { id: string; label: string; todos: ITodo[] }) => {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            className="bg-gray-50 border dark:bg-gray-900 dark:text-gray-100 border-gray-200 rounded-lg p-4 min-h-[400px] shadow-sm"
            >
            <h3 className="text-lg font-semibold mb-4 capitalize">{label.replace("_", " ")}</h3>
            <div className="space-y-4">
                {todos.map((todo) => (
                    <DraggableTodo key={todo.id} todo={todo} />
                ))}
            </div>
        </div>
    );
};
export default Column;