import { useEffect, useState } from "react"
import CreateNewProject from "../CreateProject/CreateProject"
import getProject from "../../service/firebase/project/getProject"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../service/firebase/firebaseConfig"
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import deletProject from "../../service/firebase/project/deletProject"
import EditProject from "../editProject/editProject"


function MyProject () {
    const [newProject, setNewProject] = useState(false) 
    const [project, setProject] = useState([])
    const [edit, setEdit] = useState(false)
    const [editedProject, setEditedProject] = useState()
    const [user, setUser] = useState()
    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, async(user) => { // verifica se o usuario esta logado, e pega as credencias do usuario 
            if(user){
                const result = await getProject(user)// uma vez logado ele chama a função de buscar projetos passando as credenciais para a função
                setUser(user)
                setProject(result)
            }else {
                setProject([])
            }
        })
        return () => unsubscribe()
    })

    return (
        <div>
            {newProject && <CreateNewProject setNewProject={setNewProject}/>}
            <header>
                <h2>Meus Projetos</h2>
                <button onClick={() => setNewProject(true)}> Novo Projeto</button>
            </header>

            <section>
                <div>
                    {edit && <EditProject setEdit={setEdit} editedProject= {editedProject} user={user} />}
                    {project.map((item) =>{
                        return(
                            <div key={item.id}>
                                <p>{item.title}</p>
                                <p>{item.description}</p>

                                <div>
                                    <div onClick={() => deletProject(item.id)}><FaTrashAlt /> Excluir</div>

                                    <div onClick={() => {
                                        setEdit(true)
                                        setEditedProject(item)
                                        
                                    }}><FaEdit />Editar</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
        </div>
    )
}

export default MyProject