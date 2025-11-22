import { signOut } from "firebase/auth"
import { auth } from "../../service/firebase/firebaseConfig"
import { Link, useNavigate } from "react-router-dom"
import { use, useEffect, useState } from "react"
import CreateNewProject from "../CreateProject/CreateProject"
import getProject from "../../service/firebase/project/getProject"
import { useProject } from "../../hooks/useContext.jsx"
import style from "./nav.module.css"
import { FaBars, FaBookmark, FaList, FaSignOutAlt, FaTag, FaRegEdit, FaRegStickyNote } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";



function NavBar ({user}) {
    const [newProject, setNewProject] = useState(false)
    const [project, setProject] = useState([]) 
    const {setProjectClick} = useProject()
    const [navBar, setNavBar] = useState(false)
    const nav = useNavigate()
    
    useEffect(() => {
        async function buscProject () {
            if(!user) return
            const result = await getProject(user)
            setProject(result)
        }
        buscProject()
    })

    return (
        <menu className={style.main}>
            <div>
                <header className={style.head}>
                    <div className={style.menuContent}>
                        <h3 className={style.menuH1}>Menu</h3>
                        <FaBars onClick={() => {
                        }}  className={style.menuIcon}/>
                    </div>
                    <div>
                        <input type="text" className={style.inputBusc} placeholder="Buscar projetos.." />
                    </div>
                </header>
                <aside className={style.asideOptions}>
                    <p className={style.titleOptions}>Opções</p>
                    <ul className={style.ulOptions}>
                        <Link to='/home/projetos' className={style.link}>
                            <li className={style.liOptions}>
                                <FaList className={style.icon} />
                                <p className={style.pOptions}> Projetos</p>
                            </li>
                        </Link>
                        <Link to='/home/notas' className={style.link}>
                            <li className={style.liOptions}>
                                <FaRegStickyNote className={style.icon}/>
                                <p className={style.pOptions}>Notas</p>
                            </li>
                        </Link>
                        
                        <Link to='/home/favoritos' className={style.link}>
                            <li className={style.liOptions}>
                                <FaBookmark className={style.icon}/>
                                <p className={style.pOptions}>Favoritos</p>
                            </li>
                        </Link>
                    </ul>
                </aside>
                <aside className={style.asideProject} >
                    <p className={style.titleProject}>Projetos</p>
                    <ul className={style.ulProject}>
                        {project.map((item) => {
                            return(
                                <li key={item.id} className={style.liProject } onClick={() => {
                                    nav(`/home/projeto/${item.title}`)
                                    setProjectClick(item)
                                }}> <FaRegEdit /> {item.title}</li>
                            )
                        })}
                    </ul>
                    <p className={style.butNewP} onClick={() => setNewProject(true)}><strong>+</strong> Novo projeto</p>
                    {newProject && <CreateNewProject setNewProject={setNewProject}/>}
                </aside>
                {/*
                <aside className={style.asideTags}>
                    <p className={style.titleTag}>Tags</p>
                    <ul className={style.ulTag}>
                        <li className={style.liTag}><FaTag /> Estudo</li>
                        <li className={style.liTag}><FaTag /> Trabalho</li>
                        <li className={style.liTag}><FaTag /> Pessoal</li>
                        <li className={style.liTag}><FaTag /> Freeelancer</li>
                    </ul>
                </aside>
                */}
            </div>
            <section className={style.section}>
                <Link className={style.link} to={'/home/configuracaes'}>
                    <p className={style.config}><FaGear /> Configurações</p>
                </Link>
                
                <p className={style.singOut} onClick={() => {
                    signOut(auth)
                }}><FaSignOutAlt /> Sair</p>
            </section>

        </menu>
    )
}

export default NavBar