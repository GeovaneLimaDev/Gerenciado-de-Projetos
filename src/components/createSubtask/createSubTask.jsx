import { useState } from "react"
import { v4 as uuid } from "uuid"
import addTask from "../../service/firebase/subtask/addTask"
import style from "./subTask.module.css"
import { FaArrowLeft } from "react-icons/fa";


function CreateSubTask ({setNewTesk, projectClick} ) {
    const [title, setTitle] = useState('')

    async function creatTask (e) {
        e.preventDefault()
        if(!title){
            alert('preencha todos os campos antes de prosseguir!')
            return
        }

        const subtask = {
            userId: projectClick.userId,
            id: uuid(),
            idPai: projectClick.id,
            title: title,
            description: null,
            priority: null,
            progress: "backlog",
        }
        
        setNewTesk(false)
        const result = await addTask(subtask)
        
    }
    return(
        <div className={style.conteiner}>
            <main className={style.body}>
                <div onClick={() => setNewTesk(false)} className={style.butOut}>
                    <FaArrowLeft />
                </div>
                
                <h2 className={style.title}>Criar uma Nova Funcionalidade de ({projectClick.title})</h2>
                <form className={style.form}>
                    <div className={style.content}>
                        <label className={style.label} htmlFor="title">Titulo</label>
                        <input id="title" className={style.input} onChange={(e) => setTitle(e.target.value) } type="text"  placeholder="Titulo da nova funcionalidade"/>
                    </div>
                    <button type="submit" className={style.but} onClick={creatTask}>Criar</button>
                </form>
            </main>

        </div>
    )
}

export default CreateSubTask