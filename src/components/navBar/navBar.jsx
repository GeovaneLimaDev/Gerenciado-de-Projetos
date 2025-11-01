import { signOut } from "firebase/auth"
import { auth } from "../../service/firebase/firebaseConfig"
import { Link } from "react-router-dom"
import { useState } from "react"
import CreateNewProject from "../CreateProject/CreateProject"

function NavBar () {
    const [newProject, setNewProject] = useState(false) 
    
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
                    <Link to='/home'>
                        <li>Meus Projetos</li>
                    </Link>
                </ul>
            </aside>
            <aside>
                <p>Projetos</p>
                <ul>
                    
                </ul>
                <button onClick={() => setNewProject(true)}> +  Novo projeto</button>
                {newProject && <CreateNewProject setNewProject={setNewProject}/>}
            </aside>
            <aside>
                <p>Tags</p>
                <ul>
                    map
                </ul>
                <button>+ Nova Tag</button>
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