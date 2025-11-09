import { useDraggable } from "@dnd-kit/core"
import CardTask from "../cardTask/cardTask";
import { useState } from "react";

function Task ({task}) {
    const [taskClick, setTaskClick] = useState(false) 
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id });

    const styleTrasform = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    };
    return (
        <>
        {taskClick && <CardTask task={task} setTaskClick={setTaskClick} />}
            <div onClick={() => {
                setTaskClick(true)
            }} ref={setNodeRef}
            style={styleTrasform}
            {...listeners} 
            {...attributes} >      
                <p>{task.title}</p>
            </div>
        </>
        
    )
}

export default Task