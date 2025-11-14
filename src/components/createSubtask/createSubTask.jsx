import { useState } from "react"
import { v4 as uuid } from "uuid"
import addTask from "../../service/firebase/subtask/addTask"

function CreateSubTask ({setNewTesk, projectClick} ) {
    const [title, setTitle] = useState('')
    const [priority, setPriority] = useState('')

    async function creatTask () {
        if(!title || !priority){
            alert('preencha todos os campos antes de prosseguir!')
            return
        }

        const subtask = {
            userId: projectClick.userId,
            id: uuid(),
            idPai: projectClick.id,
            title: title,
            description: null,
            priority: priority,
            progress: "backlog",
        }

        const result = await addTask(subtask)
        setNewTesk(false)
    }
    return(
        <div>
            <header>
                <h3>Criar uma Nova Funcionalidade de ({projectClick.title})</h3>
            </header>
            <div>
                <div>
                    <input onChange={(e) => setTitle(e.target.value) } type="text"  placeholder="Titulo da nova funcionalidade"/>
                </div>
                <div>
                    <select onChange={(e) => setPriority(e.target.value) }>
                        <option value="">Prioridade</option>
                        <option value="Alta">Alta</option>
                        <option value="Média">Media</option>
                        <option value="Baixa">Baixa</option>
                    </select>
                </div>
                <button onClick={creatTask}>Criar</button>

                <button onClick={() => setNewTesk(false)}>cancelar</button>
            </div>

        </div>
    )
}

export default CreateSubTask