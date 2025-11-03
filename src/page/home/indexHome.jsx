import NavBar from "../../components/navBar/navBar"
import {auth} from "../../service/firebase/firebaseConfig"
import { signOut } from "firebase/auth"
import { Routes, Route} from "react-router-dom"
import style from "./homeCSS.module.css"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import MyProject from "../../components/myProject/MyProject"
import ScrumBoard from "../../components/scrum board/scrumBoard"

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
                    <NavBar />
                </nav>
                <section className={style.section}>
                    <header>
                        <h1> ola </h1>
                        imagem e nome
                    </header>
                    <aside className={style.aside}>
                        <Routes>
                            <Route path="projetos/*" element={<MyProject user={user} />} />
                            <Route path="projeto/:id" element={<ScrumBoard />} /> 
                        </Routes>
                    </aside>
                </section>
            </main>
        </div>
    )
}

export default IndexHome