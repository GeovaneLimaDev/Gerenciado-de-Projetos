import { useEffect, useState } from "react"
import style from "./cardTask.module.css"
import { FaChevronLeft } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import deletTask from "../../service/firebase/subtask/deletTask";
import updateTask from "../../service/firebase/subtask/updateTask";
import Editor from "../editorText/editor";



function CardTask ({task, setTaskClick}) {
    const [description, setDescription] = useState(task.description)
    const [title, setTitle] = useState(task.title)

    useEffect(() => {
        if(JSON.stringify(description) === JSON.stringify(task.description) && title === task.title){
            return
        }

        async function update (){
            const up = {
                ...task,
                description: description,
                title: title
            }
            
            const result = await updateTask(up)
            console.log(result)

        }

        update()
    }, [description, title])

    return (
        <div className={style.conteiner}>
            <div className={style.body}>
                <div>
                    <div onClick={() => setTaskClick(false)}>
                        <FaChevronLeft /> voltar
                    </div>

                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

                    <div onClick={() => {
                        setTaskClick(false)
                        const result = deletTask(task.id)
                        console.log(result)
                    }}>
                        <FaTrashAlt/>
                        Excluir 
                    </div>
                </div>
                <div>
                   <Editor setDescription={setDescription} task={task} />
                </div>
            </div>
        </div>
    )
}

export default CardTask