import { useState } from "react"
import CreateNewProject from "../CreateProject/CreateProject"

function MyProject () {
    const [newProject, setNewProject] = useState(false) 
    return (
        <div>
            {newProject && <CreateNewProject setNewProject={setNewProject}/>}
            <header>
                <h2>Meus Projetos</h2>
                <button onClick={() => setNewProject(true)}> Novo Projeto</button>
            </header>

            <section>
                lista de projetos
            </section>
        </div>
    )
}

export default MyProject