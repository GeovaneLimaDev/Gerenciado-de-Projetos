import { createContext, useContext, useState } from "react";
import { getData } from "../service/localStorage/localStorage";
import { auth } from "../service/firebase/firebaseConfig";

/*contexto dos projetos clicados*/
const ProjectContext = createContext()
export function ProjectProvider ({children}){
    const project = getData()

    const [projectClick, setProjectClick] = useState(project)

    return (
        <ProjectContext.Provider value={{projectClick, setProjectClick}}>
            {children}
        </ProjectContext.Provider>
    )
}

export function useProject(){
    return useContext(ProjectContext)
}

