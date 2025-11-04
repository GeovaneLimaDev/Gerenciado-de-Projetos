import { createContext, useContext, useState } from "react";
import { getData } from "../utils/localStorage";


/*contexto dos projetos clicados*/
const ProjectContext = createContext()
export function ProjectProvider ({children}){
    const project = getData()// passando o ultimo projeto clicado como valor inicial da variavél
    const [projectClick, setProjectClick] = useState(project)
    // isso evite que de erro quando reiniciar a página 
    
    return (
        <ProjectContext.Provider value={{projectClick, setProjectClick}}>
            {children}
        </ProjectContext.Provider>
    )
}

export function useProject(){
    return useContext(ProjectContext)
}

