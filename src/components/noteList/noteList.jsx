import { useEffect, useState } from "react"
import getNoteProject from "../../service/firebase/notesProject/getNote"
import { useProject } from "../../hooks/useContext"
import deletNote from "../../service/firebase/notesProject/deletNoteProject"
import style from "./noteList.module.css"
import { FaTrashAlt } from "react-icons/fa";

export default function NoteList ({setNoteClick, setList, setText}) {
    const [noteList, setNoteList] = useState([])
    const {projectClick} = useProject()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function busc () {
            const result = await getNoteProject(projectClick.id)
            setNoteList(result)
            setLoading(false)
        }
        busc()
    })

    return (
        <div className={style.body}>
            <h2 className={style.title}>Notas do Projeto <br /> {projectClick.title}</h2>
           <div className={style.carrossel}>
                {loading && <p>Carregando notas...</p>}
                {!loading && noteList.length == 0 && <p>Nenhuma nota criada..</p>}
                {noteList.map((item) => {
               
                return(
                    <article className={style.article}>
                        
                        <div className={style.content}>
                            <div onClick={() => {
                                setNoteClick(item)
                                setList(false)
                                setText(true)
                            }} key={item.id}>
                                <p className={style.text}> {item.title} </p>
                            </div>
                            <div className={style.butDelet} onClick={() => deletNote(item.id)}><FaTrashAlt /></div>
                        </div>
                    </article>
                )
               })}
           </div>
        </div>
    )
}