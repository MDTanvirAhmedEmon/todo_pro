import {
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core";

import type { ITodo } from "../../global/todoType";
import Column from "./Column";
import { useUpdateTodoMutation } from "../../redux/features/todos/todosApi";

type Props = {
    todos: ITodo[];
};

const columns = ["todo", "in_progress", "done"] as const;

const DragBoard = ({ todos }: Props) => {
    const [updateTodo] = useUpdateTodoMutation();

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const todoId = active.id as string;
        const newStatus = over.id as ITodo["status"];

        const todo = todos.find((t) => t.id === todoId);
        if (todo && todo.status !== newStatus) {
            updateTodo({ id: todoId, data: { status: newStatus } });
        }
    };

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8, // user must move 8px before drag starts
            },
        })
    );

    return (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {columns.map((col) => (
                    <Column key={col} id={col} label={col} todos={todos.filter((t) => t.status === col)} />
                ))}
            </div>
        </DndContext>
    );
};

export default DragBoard;
