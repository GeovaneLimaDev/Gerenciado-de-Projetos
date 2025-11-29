import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { auth } from "../../service/firebase/firebaseConfig";
import addProject from "../../service/firebase/project/addProject"
import { FaArrowLeft } from "react-icons/fa";
import style from "./createProject.module.css"
import { format, parse, setHours } from "date-fns";


function CreateNewProject ({setNewProject}) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [dateEnd, setDateEnd] = useState('')
    const [tag, setTag] = useState('')

    function createProject (e) {
        e.preventDefault()
        if(!title || !description || !tag){
            alert('Preencha todos os campos obrigatorios para adicionar o projeto novo!')
            return
        }
        const user = auth.currentUser //busca as credencias de usuário 

        const project = {
            userId: user.uid, // id do usuario 
            id: uuidv4(), // id do projeto 
            title: title, 
            description: description,
            dateEnd: dateEnd ? dateEnd : null, 
            creationDate: new Date(), 
            tag: tag,
            favorite: false
        }
        const res = addProject(project)
        
        setNewProject(false)
    }
    return (
        <div className={style.conteiner}>
            <aside className={style.body}> 
                <p onClick={() => setNewProject(false)} className={style.butOut}><FaArrowLeft /></p>
                <h3 className={style.title}>Criar Novo Projeto</h3>
                   
                <form action="" className={style.form}>
                     
                    <div className={style.content}>
                        <label className={style.label} htmlFor="title">Titulo</label>
                        <input id="title" className={style.input} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Titulo do projeto novo..."/>
                    </div>
                    <div className={style.content}>
                        <label className={style.label} htmlFor="des">Descrição</label>
                        <textarea required className={style.textArea} maxLength="200" rows="5" onChange={(e) => setDescription(e.target.value)}placeholder="Explique um pouco sobre o seu projeto...">
                        </textarea>
                    </div>
                    <div className={style.content}>
                        <label className={style.label} htmlFor="tag">Tags</label>
                        <select className={style.select} onChange={(e) => setTag(e.target.value)}>
                            <option value="">Escolha uma teg...</option>
                            <option value="Estudo">Estudo</option>
                            <option value="Freelancer">Freelancer</option>
                            <option value="Pessoal">Pessoal</option>
                            <option value="Trabalho">Trabalho</option>
                        </select>
                    </div>
                    <div className={style.content}>
                        <label className={style.label} form="data">Data de entrega (opcional)</label>
                        <input id="data" className={style.data} onChange={(e) => setDateEnd(e.target.value)} type="date" placeholder="Fim do projeto"/>
                    </div>

                    <button className={style.but} onClick={createProject}>Criar</button>
                </form>
            </aside>            
        </div>
    )
}

export default CreateNewProject