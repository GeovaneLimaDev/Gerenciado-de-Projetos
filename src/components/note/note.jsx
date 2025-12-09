import { useEffect, useState } from "react";
import Editor from "../editorText/editor";
import { v4 as uuid } from "uuid";
import { useProject } from "../../hooks/useContext";
import addNoteProject from "../../service/firebase/notesProject/addNoteProject";
import updatedNotesProject from "../../service/firebase/notesProject/updatNotesProject";

export default function Note ({note, setNote, setSalveLoading}) {
    const [text, setText] = useState(note ? note.text : "")
    const [title, setTitle] = useState(note ? note.title : "")
    const {projectClick} = useProject()

    useEffect(() => {
        if(title === '' && text === '') return
        let timout

        function salve (){
            clearTimeout(timout)
            
            if(note){if(title != note.title || text != note.text) setSalveLoading(true)}

            timout = setTimeout(async () => {
                
                if(!note){
                    const obj = {
                        userId: projectClick.userId,
                        idPai: projectClick.id,
                        id: uuid(),
                        title: title ? title : null,
                        text: text ? text : null,
                        
                    }

                    setNote(obj)
                    const result = await addNoteProject(obj)
                    setSalveLoading(false)

                }else if(title != note.title || text != note.text){
                    
                    const obj ={
                        ...note,
                        text: text,
                        title: title
                    }
                    const result = await updatedNotesProject(obj)
                    console.log(result)
                    setSalveLoading(false)
                }
            }, 800)
        }
        salve()

        return () => {
            clearTimeout(timout)
        }

    }, [title, text])

    return (
        <>
            <Editor setText={setText} setTitle={setTitle} title={title} note={note} />
        </>
    )
}