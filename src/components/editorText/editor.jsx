import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import { useState } from 'react'
import style from './editor.module.css'


function Editor ({setDescription, description}) {
    // const [value, set value] 
    const editor = useEditor({
        extensions:[StarterKit],
        onUpdate: ({ editor }) => {
            const html = editor.getHTML()
            (html)
        }
    })

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
            <EditorContent className={style.editor} value={description} editor={editor}/>
        </>
    )
} 

export default Editor