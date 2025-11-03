import { createContext, useContext, useState } from "react";

/*contexto dos projetos clicados*/
const ProjectContext = createContext()

export function ProjectProvider ({children}){
    const [projectClick, setProjectClick] = useState(null)

    return (
        <ProjectContext.Provider value={{projectClick, setProjectClick}}>
            {children}
        </ProjectContext.Provider>
    )
}

export function useProject(){
    return useContext(ProjectContext)
}

