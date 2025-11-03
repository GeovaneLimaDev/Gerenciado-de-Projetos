import { createContext, useContext, useState } from "react";
import { auth } from "../service/firebase/firebaseConfig";

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

/*Contexto das credenciais do usuário*/
const userContext = createContext()

export function UserProvider ({children}) {
    const [user, setUser] = useState(null)

    return (
        <UserProvider.Provider value={{user, setUser}}>
            {children}
        </UserProvider.Provider>
    )
}

export function useUser ( ) {
    return useContext(useContext)
}
