import { useEffect, useState } from "react"
import { useProject } from "../../hooks/useContext.jsx"
import style from "./scrumBoardCSS.module.css"
import CreateSubTask from "../createSubtask/createSubTask.jsx"
import getTask from "../../service/firebase/subtask/getTask.js"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../service/firebase/firebaseConfig.js"
import {DndContext, useSensor, useSensors, MouseSensor, TouchSensor} from "@dnd-kit/core"
import Column from "../column/column.jsx"
import updateTask from "../../service/firebase/subtask/updateTask.js"
import { FaArrowLeft } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import NoteProject from "../noteProject/noteProject.jsx"


function ScrumBoard () {
    const {projectClick} = useProject()
    const [newTesk, setNewtesk] = useState(false)
    const [subtask, setSubtask] = useState([])
    const [start, setStart] = useState(false)
    const [notes, setNotes] = useState(false)
    const nav = useNavigate()

    window.document.title = projectClick.title

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 0.6,
        },
    })

    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: {
            delay: 200,
            tolerance: 5,
        },
    })

    const sensors = useSensors(mouseSensor, touchSensor)


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
    }, [newTesk, subtask])
    function headleDragStart (event) {
        const {active, over} = event
        setStart(active.id)
    }
    function headleDragEnd(event) {
        const {active, over} = event
         if(over) {
            const taskList = subtask.filter(item => item.id != active.id)
            const task = subtask.find(item => item.id === active.id)
            const newTask = {
                progress: over.id,
                id: task.id,
                idPai: task.idPai,
                priority: task.priority,
                title: task.title,
                userId: task.userId,
                description: task.description
            }
            
            setSubtask([...taskList, newTask])
            const result = updateTask(newTask)
            setStart(false)
        
        }
    }
    return (
        <div className={style.conteiner}>
            <header className={style.head}>
                <div className={style.headContent}>
                    <p onClick={() => nav('/home/projetos')} className={style.volt}>
                        <FaArrowLeft  />
                    </p>

                    <h2 className={style.titleHead}>{projectClick.title}</h2>
                </div>

                <div className={style.butsHead}>
                    <button className={style.butNewP} onClick={() => setNewtesk(true)}>Criar funcionalidade</button>
                    <button onClick={() => setNotes(true)}>Notas Rapidas</button>
                </div>
                {newTesk && <CreateSubTask setNewTesk={setNewtesk} projectClick={projectClick} />}
            </header>
            <section className={style.section}>
                {notes && <NoteProject setNotes={setNotes} />}
                <DndContext sensors={sensors} onDragEnd={headleDragEnd} onDragStart={headleDragStart}>
                    <Column
                        id="backlog"
                        title="Backlog"
                        tasks={subtask.filter(item => item.progress === 'backlog')}
                        start={start}
                    />
                    <Column
                        id="afazer"
                        title="A Fazer"
                        tasks={subtask.filter(item => item.progress === 'afazer')}
                        start={start}
                    />
                    <Column
                        id="fazendo"
                        title="Fazendo"
                        tasks={subtask.filter(item => item.progress === 'fazendo')}
                        start={start}
                    />
                    <Column
                        id="feito"
                        title="Feito"
                        tasks={subtask.filter(item => item.progress === 'feito')}
                        start={start}
                    />
                </DndContext>
            </section>
        </div>
    )
}

export default ScrumBoard