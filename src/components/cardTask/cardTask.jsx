import { useState } from "react"
import style from "./cardTask.module.css"
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import deletTask from "../../service/firebase/subtask/deletTask";
import updateTask from "../../service/firebase/subtask/updateTask";
import Editor from "../editorText/editor";



function CardTask ({task, setTaskClick}) {
    const [description, setDescription] = useState(task.description)
    const [title, setTitle] = useState(task.title)


    async function update () {
        const up = {
            ...task,
            description: description,
            title: title
        }

        const result = await updateTask(up)
        setTaskClick(false)
    }
    return (
        <div className={style.conteiner}>
            <div className={style.body}>
                <div>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />


                </div>
                <div>
                   <Editor setDescription={setDescription} task={task}/>
                   <div onClick={() => {
                        setTaskClick(false)
                        const result = deletTask(task.id)
                        console.log(result)
                    }}>
                        <FaTrashAlt/>
                        Excluir 
                    </div>
                    <div onClick={update}>
                        <FaEdit />
                        Salvar
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardTask