import { useDraggable } from "@dnd-kit/core"
import CardTask from "../cardTask/cardTask";
import { useState } from "react";

function Task ({task, listTasks}) {
    const [taskClick, setTaskClick] = useState(false) 
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id });

    const styleTrasform = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    };
    return (
        <>
        {taskClick && <CardTask task={task} setTaskClick={setTaskClick} listTasks={listTasks}/>}
            <div onClick={() => {
                setTaskClick(true)
            }} ref={setNodeRef}
            style={styleTrasform}
            {...listeners} 
            {...attributes} >      
                <p>{task.title}</p>
                <p>{task.description}</p>
            </div>
        </>
        
    )
}

export default Task