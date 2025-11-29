import { useState } from "react"
import { emailValidation } from "../../../utils/validators"
import recoverPass from "../../../service/firebase/login/recoverPass"
import style from "./RecoverPass.module.css"
import { FaArrowLeft } from "react-icons/fa"

function RecoverPass ({setRecover}) {
    //função de recuperação de senha
    const [email, setEmail] = useState() 

    async function recover (e) {
        e.preventDefault()
        
        if(!email){
            alert('Adicione o email para recuperar sua conta!')
            return
        }
        const chackEmail = emailValidation(email)
        if(!chackEmail){
            alert('Email inválido!')
            return
        }

        const res = await recoverPass(email)
        setRecover(false)

        alert(res)
    }
    return ( 
        <div className={style.conteiner}>
            <aside className={style.body}>
                <div onClick={() => setRecover(false)} className={style.butOut}>
                    <FaArrowLeft />
                </div>
                <form action="" className={style.form}>
                    <h3 className={style.title}>Email de recuperação</h3>
                    <p className={style.p}>Adicione um email para que você possa recuperar sua conta.</p>
                    <div className={style.content}>
                        <label className={style.label} htmlFor="">Email de recupeeração</label>
                        <input className={style.input} onChange={(e) => setEmail(e.target.value)} type="email"  />
                    </div>
                    <button className={style.but} onClick={recover}>Recuperar</button>
                </form>
            </aside>
        </div>
    )
}

export default RecoverPass