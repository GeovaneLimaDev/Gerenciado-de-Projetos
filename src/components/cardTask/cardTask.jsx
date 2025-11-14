import { useState } from "react"
import style from "./cardTask.module.css"
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import deletTask from "../../service/firebase/subtask/deletTask";
import updateTask from "../../service/firebase/subtask/updateTask";
import Editor from "../editorText/editor";



function CardTask ({task, setTaskClick}) {
    const [description, setDescription] = useState(task.description)
    const [value, setValue] = useState('')


    async function update () {
        console.log(task)
        const up = {
            ...task,
            description: description
        }

        const result = await updateTask(up)
        console.log(result)
        setTaskClick(false)
    }
    return (
        <div className={style.conteiner}>
            <div className={style.body}>
                <div>
                    <h3>{task.title}</h3>
                    <div>
                </div>
                </div>
                
                <div>
                   <Editor setDescription={setDescription} description={description}/>
                </div>
                <div className={style.butsConfig}>
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
                <div>

                </div>
            </div>
        </div>
    )
}

export default CardTask