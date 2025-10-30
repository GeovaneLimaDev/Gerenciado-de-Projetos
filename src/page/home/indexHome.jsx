import NavBar from "../../components/navBar/navBar"
import {auth} from "../../service/firebase/firebaseConfig"
import { signOut } from "firebase/auth"
import { Routes, Route} from "react-router-dom"
import style from "./homeCSS.module.css"

function IndexHome () {
    async function sair () {
        await signOut(auth)
    }
    return (
        <main>
            <button onClick={sair}>sair</button>
            <nav>
                <NavBar />
            </nav>
            <section>
                <header>
                    <h1> ola </h1>
                    <button> novo projeto</button>
                </header>

                <aside>
                    <Routes>
                        
                    </Routes>
                </aside>
            </section>

        </main>
    )
}

export default IndexHome