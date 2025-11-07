import { useDraggable } from "@dnd-kit/core"

function Task ({task}) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id });

    const styleTrasform = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    };
    return (
        <div ref={setNodeRef}
        style={styleTrasform}
         {...listeners} 
         {...attributes} >
            <p>{task.title}</p>
            <p>{task.description}</p>
        </div>
    )
}

export default Task