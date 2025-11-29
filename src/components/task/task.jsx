import { useDraggable } from "@dnd-kit/core"
import { useEffect, useState } from "react";
import style from "./task.module.css"
import { FaAngleDown, FaAngleUp, FaTrashAlt } from "react-icons/fa";
import updateTask from "../../service/firebase/subtask/updateTask";
import deletTask from "../../service/firebase/subtask/deletTask";

//Carde das subTask
function Task ({task}) {
    const [taskClick, setTaskClick] = useState(false) 
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id }); // algun atributos que o dnd precisa pra funcionar
    const [title, setTitle] = useState(task.title)
    const [description, setDescription] = useState(task.description)
    const [priority, setPriority] = useState(task.priority)

    const styleTrasform = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,// configurações de estilo do drag and drop
    };
    
    //useEffect para o auto salve da area de edita subTask 
    useEffect(() => {
        if(title === task.title && description === task.description && priority === task.priority) return // inpede que faça atualizações sem ter atualização
        let timeout 
        console.log('ola')
        function save (){
            clearTimeout(timeout)

            timeout = setTimeout(() => {
                //atualiza a sub task depois de 800 misegundos da ultima modificação na textarea ou input 
                const obj = {
                    ...task,
                    description: description,
                    title: title,
                    priority: priority
                }

                const result = updateTask(obj)
                console.log(result)
            }, 800)
        }
        save()

        return () => {
            clearTimeout(timeout)
        }
    }, [title, description, priority])

    return (
        <>
            <div className={style.body} ref={setNodeRef}
            style={styleTrasform}
            {...listeners} 
            {...attributes} >      
                <div className={style.titleContent}>
                    <p>{task.title}</p>
                    
                    <div className={taskClick ? style.hiden : style.but} onClick={() => {
                        setTaskClick(task.id)
                    }}><FaAngleDown /></div>

                    <div onClick={() => setTaskClick(false)} className={`${taskClick ? style.but : style.hiden}`}>
                        <FaAngleUp />
                    </div>
                </div>

                <div className={`${taskClick === task.id ? style.aside : style.hiden}`}>
                    <div>
                        <input onChange={(e) => setTitle(e.target.value)} type="text" className={style.title} placeholder="Redefinir Titulo"/>
                    </div>
                    <div>
                        <textarea onChange={(e) => setDescription(e.target.value)} value={description ? description : ""} placeholder="Anotações importantes da tesk" rows="5" className={style.text} name="" id=""></textarea>
                    </div>
                    <div className={style.deletContent}>
                        <select value={priority} onChange={(e) => setPriority(e.target.value)} name="" id="" className={style.select}>
                            <option className={style.opaco} value="">Prioridade</option>
                            <option value="Alta">Alta</option>
                            <option value="Média">Média</option>
                            <option value="Baixa">Baixa</option>
                        </select>
                        <p onClick={() => deletTask(task.id)} className={style.butDelet}>
                            <FaTrashAlt />
                        </p>
                    </div>
                </div>
            </div>
        </>
        
    )
}

export default Task