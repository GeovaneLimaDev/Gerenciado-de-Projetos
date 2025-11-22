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


function ScrumBoard () {
    const {projectClick} = useProject()
    const [newTesk, setNewtesk] = useState(false)
    const [subtask, setSubtask] = useState([])

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
        
        }
    }
    return (
        <div className={style.conteiner}>
            <header>
                <h2>{projectClick.title}</h2>
                <button onClick={() => setNewtesk(true)}>Criar funcionalidade</button>
                {newTesk && <CreateSubTask setNewTesk={setNewtesk} projectClick={projectClick} />}
            </header>
            <section className={style.section}>
                <DndContext sensors={sensors} onDragEnd={headleDragEnd}>
                    <Column
                        id="backlog"
                        title="Backlog"
                        tasks={subtask.filter(item => item.progress === 'backlog')}
                    />
                    <Column
                        id="afazer"
                        title="A Fazer"
                        tasks={subtask.filter(item => item.progress === 'afazer')}
                    />
                    <Column
                        id="fazendo"
                        title="Fazendo"
                        tasks={subtask.filter(item => item.progress === 'fazendo')}
                    />
                    <Column
                        id="feito"
                        title="Feito"
                        tasks={subtask.filter(item => item.progress === 'feito')}
                    />
                </DndContext>
            </section>
        </div>
    )
}

export default ScrumBoard