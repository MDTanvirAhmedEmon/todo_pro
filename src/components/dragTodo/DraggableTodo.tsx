import type { ITodo } from "../../global/todoType";
import TodoCart from "../TodoCart";
import {
    useDraggable,
} from "@dnd-kit/core";

const DraggableTodo = ({ todo }: { todo: ITodo }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: todo.id,
    });

    const style = {
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <TodoCart todo={todo} />
        </div>
    );
};
export default DraggableTodo;