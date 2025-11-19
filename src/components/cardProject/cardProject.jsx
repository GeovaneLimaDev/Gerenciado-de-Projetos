import { addData } from "../../utils/localStorage"
import { useProject } from "../../hooks/useContext"
import { useNavigate } from "react-router-dom"
import deletProject from "../../service/firebase/project/deletProject"
import { FaEdit } from "react-icons/fa"
import { FaTrashAlt } from "react-icons/fa"
import style from './card.module.css'

export default function CardProject ({project, setEdit, setEditedProject}) {
    const {setProjectClick} = useProject()
    const nav = useNavigate()

    return (
        <div className={style.body}>
            <section className={style.section} onClick={() => {
                nav(`/home/projeto/${project.title}`)
                setProjectClick(project)
                addData(project)
            }}>
                <p>{project.title}</p>
                <p>{project.description}</p>
                <p>{project.dateEnd}</p>
                <p>{project.tag}</p>
            </section>

            <aside className={style.aside}>
                    <div className={style.progresso}>
                        barra de progresso
                    </div>
                    <div className={style.butsContent}>
                        <div onClick={() => {
                            setEdit(true)
                            setEditedProject(project)
                        
                        }}>
                            <FaEdit />
                            <p>Editar</p>
                        </div>
                        <div onClick={() => deletProject(project.id)}>
                            <FaTrashAlt />
                            <p>Excluir</p>
                         </div>
                        
                    </div>
            </aside>
        </div>
    )
}