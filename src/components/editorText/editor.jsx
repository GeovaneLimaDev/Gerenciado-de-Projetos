import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { useEffect, useState } from 'react'
import style from './editor.module.css'


function Editor ({setDescription, task}) {
    useEffect(() => {
        const json = task.description
        editor.commands.setContent(json)
    },[])

    const editor = useEditor({
        extensions: [
            StarterKit,
            TaskList,
            TaskItem,
            ],
            onUpdate: ({editor}) => {
                const json = editor.getJSON()
                setDescription(json)

            },
            content: 'ola',
    });

    
    function setLink() {
        const url = prompt("Insira o link:")
        if (url) {
        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
        }
    }

    return (
        <>
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
            <EditorContent className={style.ProseMirror}  editor={editor}/>
        </>
    )
} 

export default Editor