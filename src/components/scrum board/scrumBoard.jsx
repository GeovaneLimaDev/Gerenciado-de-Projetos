import { useState } from "react"
import { useProject } from "../../hooks/useContext.jsx"
import style from "./scrumBoardCSS.module.css"
import CreateSubTask from "../createSubtask/createSubTask.jsx"
import { getData } from "../../service/localStorage/localStorage.js"
import { useNavigate } from "react-router-dom"
import { useProject } from "../../hooks/useContext.jsx"

function ScrumBoard ({user}) {
    const {projectClick} = useProject()
    const {setProjectClick} = useProject()
    const nav = useNavigate()

    if(!projectClick) {
        const project = getData()
        if(projectClick.userId != user.uid){
            nav('/projetos')
            return
        }
    }

    const [newTesk, setNewtesk] = useState(false)
    
    return (
        <div className={style.conteiner}>
            <header>
                <h2>{projectClick.title}</h2>
                <button onClick={() => setNewtesk(true)}>Criar funcionalidade</button>
                {newTesk && <CreateSubTask setNewTesk={setNewtesk} projectClick={projectClick} />}
            </header>
            <section className={style.section}>
                <div className={style.board}><p>BackLog</p>
                
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