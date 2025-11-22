import NavBar from "../../components/navBar/navBar"
import {auth} from "../../service/firebase/firebaseConfig"
import { Routes, Route} from "react-router-dom"
import style from "./homeCSS.module.css"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import MyProject from "../../components/myProject/MyProject"
import ScrumBoard from "../../components/scrumBoard/scrumBoard"
import Favorit from "../../components/favorit/favorit"
import Config from "../../components/config/indexConfig"
import NotesPage from "../../components/NotesPages/Notes"

function IndexHome () {
    const nav = useNavigate()
    const [user, setUser] = useState()

    useEffect(() => {
        onAuthStateChanged(auth, (usuario) => {
            if (!usuario) {
                nav('/')
            }else{
                setUser(usuario)
            }
        })
    }, [])

    return (
        <div className={style.conteiner}>
            <main className={style.main}>
                <nav className={style.nav}>
                    <NavBar user={user} />
                </nav>
                <section className={style.section}>
    
                    <aside className={style.aside}>
                        <Routes>
                            <Route path="projetos/*" element={<MyProject user={user} />} />
                            <Route path="projeto/:id" element={<ScrumBoard user={user}/>} /> 
                            <Route path="configuracaes" element={<Config />} />
                            <Route path="favoritos" element={<Favorit />} />
                            <Route path="notas" element={<NotesPage />} />
                        </Routes>
                    </aside>
                </section>
            </main>
        </div>
    )
}

export default IndexHome