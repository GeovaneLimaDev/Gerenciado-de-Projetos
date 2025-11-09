import { useState } from "react"
import style from "./cardTask.module.css"
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import deletTask from "../../service/firebase/subtask/deletTask";
import updateTask from "../../service/firebase/subtask/updateTask";
import Quill from "quill";
import { Delta } from 'quill';
import Link from 'quill/formats/link';


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
                <h3>{task.title}</h3>
                {/* <div>
                    <textarea onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
                </div>*/}
                <div>
                 
                </div>
                <div className={style.butsConfig}>
                    <div onClick={() => {
                        setTaskClick(false)
                        deletTask(task.id)
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