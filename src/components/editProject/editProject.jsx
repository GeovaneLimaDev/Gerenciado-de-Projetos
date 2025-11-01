import { useState } from "react"
import { auth } from "../../service/firebase/firebaseConfig"

function EditProject ({setEdit, editedProject, user}){
    const [title, setTitle] =  useState('')
    const [description, setDescription] = useState('')
    const [dateEnd, setDateEnd] = useState('')

    function edit () {
        const NewProject = {
            id: editedProject.id,
            userId: editedProject.userId,
            title: !title ? editedProject.title : title,
            description: !description ? editedProject.description : description,
            dateEnd: !dateEnd ? editedProject.dateEnd : dateEnd,
            creationDate: editedProject.creationDate,
        }

        const user = auth.corr
    }
    return (
        <div>
            <h3>Editar projeto (nome do projeto)</h3>
            <div>
                <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Novo title" />
            </div>
            <div>
                <textarea onChange={(e) => setDescription(e.target.value)} placeholder="Nova descrição"></textarea>
            </div>
            <div>
                teg
            </div>
            <div>
                <input onChange={(e) => setDateEnd(e.target.value)} type="date"  />
            </div>
            <div>
                <button onClick={edit}>Editar</button>
                <button onClick={() => setEdit(false)}>Cancelar</button>
            </div>


        </div>
    )
}

export default EditProject