import { useEffect, useState } from "react"
import { useProject } from "../../hooks/useContext.jsx"
import style from "./scrumBoardCSS.module.css"
import CreateSubTask from "../createSubtask/createSubTask.jsx"
import getTask from "../../service/firebase/subtask/getTask.js"

function ScrumBoard ({user}) {
    const {projectClick} = useProject()
    const [newTesk, setNewtesk] = useState(false)
    const [subtask, setSubtask] = useState([])

    useEffect(() => {
        async function busc() {
            const result = await getTask(user) 
            setSubtask(result)
        }
        busc()
    })
    return (
        <div className={style.conteiner}>
            <header>
                <h2>{projectClick.title}</h2>
                <button onClick={() => setNewtesk(true)}>Criar funcionalidade</button>
                {newTesk && <CreateSubTask setNewTesk={setNewtesk} projectClick={projectClick} />}
            </header>
            <section className={style.section}>
                <div className={style.board}><p>BackLog</p>
                 <div className={style.carrossel}>
                    {subtask.map((item) => {
                        return(
                            <div key={item.id}>
                                {item.title}
                            </div>
                        )
                    })}
                 </div>
                </div>
                <div className={style.board}>A fazer

                </div>
                <div className={style.board}>fazendo

                </div>
                <div className={style.board}>feito

                </div>
            </section>
        </div>
    )
}

export default ScrumBoard