import { useEffect, useState } from "react"
import { useProject } from "../../hooks/useContext.jsx"
import style from "./scrumBoardCSS.module.css"
import CreateSubTask from "../createSubtask/createSubTask.jsx"
import getTask from "../../service/firebase/subtask/getTask.js"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../service/firebase/firebaseConfig.js"
import {DndContext} from "@dnd-kit/core"

function ScrumBoard () {
    const {projectClick} = useProject()
    const [newTesk, setNewtesk] = useState(false)
    const [subtask, setSubtask] = useState([])

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async(user) => { // verifica se o usuario esta logado, e pega as credencias do usuario 
            if(user){
                const result = await getTask(user, projectClick.id)// uma vez logado ele chama a função de buscar sub tasks passando as credenciais para a função
                setSubtask(result)
            }else {
                setSubtask([])
            }
        })
        return () => unsubscribe()
    })
    console.log(projectClick.id)
    return (
        <div className={style.conteiner}>
            <header>
                <h2>{projectClick.title}</h2>
                <button onClick={() => setNewtesk(true)}>Criar funcionalidade</button>
                {newTesk && <CreateSubTask setNewTesk={setNewtesk} projectClick={projectClick} />}
            </header>
            <section className={style.section}>
                <DndContext>
                    <div className={style.board}><p>BackLog</p>
                    <div className={style.carrossel}>
                        {subtask.map((item) => {
                            return(
                                <div className={style.subtaskCard} key={item.id}>
                                    <p>{item.title}</p>
                                    <p>{item.description}</p>
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
                </DndContext>
            </section>
        </div>
    )
}

export default ScrumBoard