import { useState } from "react"
import updatProject from "../../service/firebase/project/updateProject"
import style from "./editProject.module.css"
import { FaArrowLeft } from "react-icons/fa"

//funcção para editar projetos
function EditProject ({setEdit, editedProject, user}){
    const [title, setTitle] =  useState(editedProject.title)
    const [description, setDescription] = useState(editedProject.description)
    const [dateEnd, setDateEnd] = useState('')
    const [tag, setTag] = useState('')

    function edit () {
        const NewProject = {
            id: editedProject.id,//mantem o id do projeto 
            userId: editedProject.userId,// e o id do usuário tambem 
            title: !title ? editedProject.title : title, // daqui pra frente eu usei um operador unário para simular um if else, se o usuário digitou o no cmapo titulo, ele recebe o valor digitado, mas se não foi digitado, ele recebe o valor original. 
            description: !description ? editedProject.description : description,
            tag: !tag ? editedProject.tag : tag,
            dateEnd: !dateEnd ? editedProject.dateEnd : dateEnd,
            creationDate: editedProject.creationDate, //mantem o dia de criação
        }

        const result = updatProject(NewProject)
        setEdit(false)
    }
    return (
        <div className={style.conteiner}>
            <div className={style.body}>
                <p onClick={() => setEdit(false)} className={style.butOut}><FaArrowLeft /></p>

                <h3 className={style.title}>Editar projeto {editedProject.title}</h3>
                <form action="" className={style.form}>
                    <div className={style.content}>
                        <label className={style.label} htmlFor="title0">Titulo</label>

                        <input id="title" value={title} className={style.input} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Novo title" />
                    </div>
                    <div className={style.content}>
                        <label className={style.label} htmlFor="des">Descrição</label>

                        <textarea id="des" value={description} className={style.textArea} maxLength="200" rows="5" onChange={(e) => setDescription(e.target.value)} placeholder="Nova descrição"></textarea>
                    </div>
                    <div className={style.content}>
                        <label className={style.label}  htmlFor="tag">Tags</label>
                        <select id="tag" className={style.select} onChange={(e) => setTag(e.target.value)}>
                            <option value="">Escolha uma teg...</option>
                            <option value="Estudo">Estudo</option>
                            <option value="Freelancer">Freelancer</option>
                            <option value="Pessoal">Pessoal</option>
                            <option value="Trabalho">Trabalho</option>
                        </select>
                    </div>
                    <div className={style.content}>
                        <label className={style.label} htmlFor="date">Data de entrega</label>
                        <input id="date" className={style.data} onChange={(e) => setDateEnd(e.target.value)} type="date"  />
                    </div>
                    <div>
                        <button className={style.but} onClick={edit}>Editar</button>
                    </div>
                </form>
            </div>


        </div>
    )
}

export default EditProject