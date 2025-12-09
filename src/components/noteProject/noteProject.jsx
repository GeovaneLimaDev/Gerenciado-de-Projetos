import { useEffect, useState } from "react"
import style from "./note.module.css"
import NoteList from "../noteList/noteList"
import Note from "../note/note"
import { FaAngleLeft, FaTrashAlt, FaPlus, FaCheck  } from "react-icons/fa";
import { FaXmark, FaArrowsRotate  } from "react-icons/fa6";


function NoteProject ({setNotes}) {
    const [list, setList] = useState(true)
    const [text, setText] =  useState(false)
    const [noteClick, setNoteClick] = useState()
    const [salveLoading, setSalveLoading] = useState(false)
    const [salve, setSalve] = useState(false)

    useEffect(() => {
        if(!salveLoading && text){
            setSalve(true)
        }
        let timout 

        function busc (){
            clearTimeout(timout)

            timout = setTimeout(() => {setSalve(false)}, 900)
        }
        busc()

        return () => {
            clearTimeout(timout)
        }
        
    }, [salveLoading])

    return (
        <div className={style.body}>
            <header className={style.head}>
                <div className={style.contentBut2}>
                    <p className={`${style.hiden} ${text ? style.but : ""}`} onClick={() => {
                        setList(true)
                        setText(false)
                    }}><FaAngleLeft /></p>

                    <p className={`${style.hiden} ${text ? style.but : ""}`} onClick={() => {
                        setList(true)
                        setText(false)
                    }}><FaTrashAlt /></p>
                </div>

                <div className={style.contentBut}>
                    {salveLoading && !salve && <p className={style.iconStatus}><FaArrowsRotate /></p>}
                    {salve && <p className={style.iconStatus} id={style.check}><FaCheck /></p>}
                    <p id={style.butPlus} className={style.but} onClick={() => {
                        setText(true)
                        setList(false)
                        setNoteClick()
                    }}><FaPlus /></p>
                    <p id={style.butx} className={style.but} onClick={() => setNotes(false)}><FaXmark /></p>
                </div>
            </header>
            <aside className={style.aside}>
                {list && <NoteList setNoteClick={setNoteClick} setList={setList} setText={setText}  />}

                {text && <Note note={noteClick} setNote={setNoteClick} setSalveLoading={setSalveLoading}/>}
            </aside>
        </div>
    )
}

export default NoteProject