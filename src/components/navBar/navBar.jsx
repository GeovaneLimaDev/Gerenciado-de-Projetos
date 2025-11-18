import { signOut } from "firebase/auth"
import { auth } from "../../service/firebase/firebaseConfig"
import { Link, useNavigate } from "react-router-dom"
import { use, useEffect, useState } from "react"
import CreateNewProject from "../CreateProject/CreateProject"
import getProject from "../../service/firebase/project/getProject"
import { useProject } from "../../hooks/useContext.jsx"



function NavBar ({user}) {
    const [newProject, setNewProject] = useState(false)
    const [project, setProject] = useState([]) 
    const {setProjectClick} = useProject()
    const nav = useNavigate()
    
    useEffect(() => {
        async function buscProject () {
            if(!user) return
            const result = await getProject(user)
            setProject(result)
            console.log(result)
        }
        buscProject()
    })

    return (
        <menu>
            <header>
                <div>
                    <h3>Menu</h3>
                </div>
                <div>busca</div>
            </header>
            <aside>
                <p>Opções</p>
                <ul>
                    <Link to='/home/projetos'>
                        <li>Meus Projetos</li>
                    </Link>
                </ul>
            </aside>
            <aside>
                <p>Projetos</p>
                <ul>
                    {project.map((item) => {
                        return(
                            <li onClick={() => {
                                nav(`/home/projeto/${item.title}`)
                                setProjectClick(item)
                            }}>{item.title}</li>
                        )
                    })}
                </ul>
                <button onClick={() => setNewProject(true)}> +  Novo projeto</button>
                {newProject && <CreateNewProject setNewProject={setNewProject}/>}
            </aside>
            <aside>
                <p>Tags</p>
                <ul>
                    <li>Estudo</li>
                    <li>Trabalho</li>
                    <li>Pessoal</li>
                    <li>Freeelancer</li>
                </ul>
            </aside>
            <section>
                <p>Configurações</p>
                <button onClick={() => {
                    signOut(auth)
                }}>sair</button>
            </section>

        </menu>
    )
}

export default NavBar