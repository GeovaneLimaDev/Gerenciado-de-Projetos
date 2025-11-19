import { useEffect, useState } from "react"
import CreateNewProject from "../CreateProject/CreateProject"
import getProject from "../../service/firebase/project/getProject"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../service/firebase/firebaseConfig"
import { FaEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import deletProject from "../../service/firebase/project/deletProject"
import EditProject from "../editProject/editProject"
import { useNavigate } from "react-router-dom"
import { useProject } from "../../hooks/useContext.jsx"
import { addData } from "../../utils/localStorage.js"
import style from "./project.module.css"
import CardProject from "../cardProject/cardProject.jsx"
import { FaPlus } from "react-icons/fa"


function MyProject () {
    const [newProject, setNewProject] = useState(false) 
    const [project, setProject] = useState([])
    const [edit, setEdit] = useState(false)
    const [editedProject, setEditedProject] = useState()
    const [user, setUser] = useState()
    const nav = useNavigate()
    const [loading, setLoading] = useState(true)
    

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, async(user) => { // verifica se o usuario esta logado, e pega as credencias do usuario 
            if(user){
                const result = await getProject(user)// uma vez logado ele chama a função de buscar projetos passando as credenciais para a função
                setUser(user)
                setProject(result)
                setLoading(false)
            }else {
                setProject([])
            }
        })
        return () => unsubscribe()
    })

    return (
        <div className={style.body}>
            {newProject && <CreateNewProject setNewProject={setNewProject}/>}
            <header className={style.head}>
                <h2 className={style.titleHead}>Meus Projetos</h2>
                <button className={style.butNewP} onClick={() => setNewProject(true)}><FaPlus /> Novo Projeto</button>
            </header>

            <section className={style.section}>  
                {edit && <EditProject setEdit={setEdit} editedProject= {editedProject} user={user} />}

                {loading && <p>Carregando...</p>}

                {!loading && project.length === 0 ? <p>Nenhum projeto criado ainda.</p> : ''}

                {project.map((item) =>{
                    return(
                        <CardProject key={item.id} project={item} setEdit={setEdit} setEditedProject={setEditedProject}/>
                    )
                })}
            </section>
        </div>
    )
}

export default MyProject