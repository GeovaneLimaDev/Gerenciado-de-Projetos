import { useState } from "react"
import { auth } from "../../service/firebase/firebaseConfig"
import updatProject from "../../service/firebase/project/updateProject"

//funcção para editar projetos
function EditProject ({setEdit, editedProject, user}){
    const [title, setTitle] =  useState('')
    const [description, setDescription] = useState('')
    const [dateEnd, setDateEnd] = useState('')

    function edit () {
        const NewProject = {
            id: editedProject.id,//mantem o id do projeto 
            userId: editedProject.userId,// e o id do usuário tambem 
            title: !title ? editedProject.title : title, // daqui pra frente eu usei um operador unário para simular um if else, se o usuário digitou o no cmapo titulo, ele recebe o valor digitado, mas se não foi digitado, ele recebe o valor original. 
            description: !description ? editedProject.description : description,
            dateEnd: !dateEnd ? editedProject.dateEnd : dateEnd,
            creationDate: editedProject.creationDate, //mantem o dia de criação
        }

        const result = updatProject(NewProject)
        setEdit(false)
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