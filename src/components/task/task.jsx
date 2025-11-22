import { useDraggable } from "@dnd-kit/core"
import CardTask from "../cardTask/cardTask";
import { useState } from "react";
import style from "./task.module.css"

function Task ({task, start}) {
    const [taskClick, setTaskClick] = useState(false) 
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id });

    const styleTrasform = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    };
    return (
        <>
        {taskClick && <CardTask task={task} setTaskClick={setTaskClick} />}
            <div className={style.body} onClick={() => {
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