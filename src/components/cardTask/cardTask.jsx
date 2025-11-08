import { useState } from "react"
import style from "./cardTask.module.css"
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import deletTask from "../../service/firebase/subtask/deletTask";

function CardTask ({task, setTaskClick}) {
    const [description, setDescription] = useState(task.description)

    return (
        <div className={style.conteiner}>
            <div className={style.body}>
                <h3>{task.title}</h3>
                <div>
                    <textarea onChange={(e) => setDescription(e.target.value)} value={description}></textarea>
                </div>

                <div className={style.butsConfig}>
                    <div onClick={() => {
                        setTaskClick(false)
                        deletTask(task.id)
                    }}>
                        <FaTrashAlt/>
                        Excluir Funcionalidade
                    </div>
                    <div>
                        <FaEdit />
                        Salvar
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardTask