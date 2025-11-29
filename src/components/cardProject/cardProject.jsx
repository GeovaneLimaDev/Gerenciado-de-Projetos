import { addData } from "../../utils/localStorage"
import { useProject } from "../../hooks/useContext"
import { useNavigate } from "react-router-dom"
import { FaBookmark, FaPen, FaTag, FaTrashAlt } from "react-icons/fa"
import style from './card.module.css'
import {format} from 'date-fns'
import deletAll from "../../service/firebase/project/deletAll"
import { useState } from "react"
import updatProject from "../../service/firebase/project/updateProject"

export default function CardProject ({project, setEdit, setEditedProject}) {
    const {setProjectClick} = useProject()
    const nav = useNavigate()

    return (
        <div className={style.body}>
            <section tabIndex={0} className={style.section} onClick={() => {
                nav(`/home/projeto/${project.title}`)
                setProjectClick(project)
                addData(project)
            }}>
                
                <header >
                    <p className={style.title}>{project.title}</p>
                    <div className={style.des}>{project.description}</div>
                </header>
                <div className={style.tagContent}>
                    <p className={project.dateEnd ? style.data : style.hiden}>{project.dateEnd ? format(project.dateEnd, 'dd/MM') : ""}</p>

                    <p className={style.tag}>{project.tag}</p>
                </div>

            </section>

            <aside className={style.aside}>
                    <div className={style.progresso}>
                        barra de progresso
                    </div>
                    <div className={style.butsContent}>

                        <div onClick={() => {
                            if(project.favorite === true){
                                const obj  = {
                                    ...project,
                                    favorite: false
                                } 
                                const result = updatProject(obj)
                            }else if(project.favorite === false) {
                                const obj  = {
                                    ...project,
                                    favorite: true
                                } 
                                const result = updatProject(obj)
                            }


                        }} id={style.fav} className={style.buts}>
                            <FaBookmark />
                        </div>
                        <div id={style.edit} className={style.buts} onClick={() => {
                            setEdit(true)
                            setEditedProject(project)
                        
                        }}>
                            <FaPen />

                        </div>
                        <div id={style.delet} className={style.buts} onClick={async () => {
                            const result = await deletAll(project)
                            console.log(result)
                        }}>
                            <FaTrashAlt />
                         </div>
                        
                    </div>
            </aside>
        </div>
    )
}