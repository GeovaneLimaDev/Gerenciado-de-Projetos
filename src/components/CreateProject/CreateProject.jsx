import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { auth } from "../../service/firebase/firebaseConfig";
import addProject from "../../service/firebase/project/addProject"


function CreateNewProject ({setNewProject}) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dateEnd, setDateEnd] = useState('')
    const [tag, setTag] = useState('')

    function createProject (e) {
        e.preventDefault()
        if(!title || !description){
            alert('Preencha todos os campos obrigatorios para adicionar o projeto novo!')
            return
        }
        const user = auth.currentUser //busca as credencias de usuário 

        const project = {
            userId: user.uid, // id do usuario 
            id: uuidv4(), // id do projeto 
            title: title, 
            description: description,
            dateEnd: dateEnd ? dateEnd : null, 
            creationDate: new Date(), 
            tag: tag
        }

        const res = addProject(project)
        
        setNewProject(false)
    }
    return (
        <div>
            <aside> 
                <h3>Criar Novo Projeto</h3>    
                <form action="">
                    <div>
                        <input onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Titulo"/>
                    </div>
                    <div>
                        <textarea maxLength="200" rows="5" onChange={(e) => setDescription(e.target.value)}placeholder="Descrição do Projeto">
                        </textarea>
                    </div>
                    <div>
                        <select onChange={(e) => setTag(e.target.value)}>
                            <option value="">Tag</option>
                            <option value="Estudo">Estudo</option>
                            <option value="Freelancer">Freelancer</option>
                            <option value="Pessoal">Pessoal</option>
                            <option value="Trabalho">Trabalho</option>
                        </select>
                    </div>
                    <div>
                        <h5>Data de entrega (opcional)</h5>
                        <input onChange={(e) => setDateEnd(e.target.value)} type="date" placeholder="Fim do projeto"/>
                    </div>

                    <button onClick={createProject}>Criar</button>

                    <button onClick={() => setNewProject(false) }>Cancelar</button>
                </form>
            </aside>            
        </div>
    )
}

export default CreateNewProject