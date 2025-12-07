import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import { useEffect, useState } from 'react'
import style from './editor.module.css'
import { FaCheckSquare, FaLink, FaListUl } from "react-icons/fa";
import Placeholder from '@tiptap/extension-placeholder'

function Editor ({setText, setTitle, title, note}) {
    const text = note ? note.text : ""
    const [negrito, setNegrito] = useState(false)
    const [italico, setItalico] = useState(false)
    const [sublinhado, setSublinhado] = useState(false)
    const [cheklist, setCheklist] = useState(false)
    const [list, setList] = useState(false)

const placehoder = text ? "" : "Escreva uma nota.."
    const editor = useEditor({
        extensions: [
            StarterKit,
            TaskList,
            TaskItem,
            Placeholder.configure({
                placeholder: "Escreva uma nota...",
            }),
            ]
    });

    useEffect(() => {
        if (!editor) return
        if(!note) return
        const json = note.text
        editor.commands.setContent(json)
    }, [editor])

    useEffect(() => {
        if (!editor) return
        let timeout

        const handler = () => {
            clearTimeout(timeout)
            
            timeout = setTimeout(() => {
                const des = editor.getJSON()
                setText(des)           
            }, 800)
        }

        editor.on('update', handler)

        return () => {
            clearTimeout(timeout)
            editor.off('update', handler)
        }
    }, [editor])

    
    function setLink() {
        const url = prompt("Insira o link:")
        if (url) {
        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
        }
    }

    return (
        <div className={style.body}>  
            <input className={style.input} type="text" value={title} placeholder='Titulo da nota...' onChange={(e) => setTitle(e.target.value)}/>

            <div>
                <EditorContent editor={editor} className={style.editor}/>
            </div>

            <div className={style.contentBut}>
                <button id={style.butn} className={`${negrito ? style.ative : style.but}`}  
                onClick={() => {
                    editor.chain().focus().toggleBold().run()
                    !negrito?setNegrito(true):setNegrito(false) 
                }}>N</button>

                <button className={`${italico ? style.ative : style.but}`}  onClick={() => {editor.chain().focus().toggleItalic().run()
                    !italico?setItalico(true):setItalico(false)
                }}>I</button>

                <button className={`${sublinhado ? style.ative : style.but}`} onClick={() => {editor.chain().focus().toggleUnderline().run()
                    !sublinhado?setSublinhado(true):setSublinhado(false)
                }}>S</button>

                <button className={`${list ? style.ative : style.but}`} onClick={() => {editor.chain().focus().toggleBulletList().run()
                    !list?setList(true):setList(false)
                }}><FaListUl /></button>

                <button className={`${cheklist ? style.ative : style.but}`} onClick={() =>{ editor.chain().focus().toggleTaskList().run()
                    !cheklist?setCheklist(true):setCheklist(false)
                }}><FaCheckSquare /> 
                </button>

                <button className={style.but} onClick={setLink}><FaLink /> </button>
            </div>
           
        </div>
    )
} 

export default Editor