import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Link from "@tiptap/extension-link";
import { useEffect, useState } from 'react'
import style from './editor.module.css'
import updateTask from '../../service/firebase/subtask/updateTask';


function Editor ({setDescription, task}) {

    const editor = useEditor({
        extensions: [
            StarterKit,
            TaskList,
            TaskItem,
            ],
            content: 'ola',
    });

    useEffect(() => {
        if (!editor) return
        const json = task.description
        editor.commands.setContent(json)
    }, [editor])

    useEffect(() => {
        if (!editor) return
        let timeout

        const handler = () => {
            clearTimeout(timeout)
            
            timeout = setTimeout(() => {
                const des = editor.getJSON()
                setDescription(des)           
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
        <>
            <EditorContent className={style.ProseMirror}  editor={editor}/>
            <div>
                <button  onClick={() => editor.chain().focus().toggleBold().run()}>N</button>
                <button  onClick={() => editor.chain().focus().toggleItalic().run()}>I</button>
                <button onClick={() => editor.chain().focus().toggleBulletList().run()}>.lista</button>
                <button onClick={() => editor.chain().focus().toggleUnderline().run()}>S</button>
                <button onClick={() => editor.chain().focus().toggleTaskList().run()}>
                ✅ Checklist
                </button>
                <button onClick={setLink}>🔗 Link</button>
            </div>
           
        </>
    )
} 

export default Editor