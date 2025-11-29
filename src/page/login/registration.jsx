import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registrationFire } from "../../service/firebase/login/registration";
import { emailValidation, passWordValidation } from "../../utils/validators";
import style from "./indexCSS.module.css"


function Registration () {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassWord] = useState('')
    const nav = useNavigate()
    async function seveData (e) {
        e.preventDefault()

        if(!name || !email ||!password){
            alert('preencha todos os campos')
        }

        const checkEmail = emailValidation(email)//valida o email
        const checkPassWord  = passWordValidation(password)// define que a senha não pode ter menos de 6 caracteres

        if(!checkEmail){
            alert('email inválido')
            return
        }else if(!checkPassWord){
            alert('A sua senha precisa ter pelo 6 caracteres')
            return
        }
        
        const data = {
            dysplayName: name,
            email: email,
            password: password
        } 

        const res = await registrationFire(data)

        
        if(res != 'feito') {
            alert(res)
            return
        }
        nav('/')
    }

    return(
        <div className={style.conteiner}>
            <main className={style.body}>
                <div className={style.formContent}>
                    <form action="" className={style.form}>
                        <h1 className={style.title}>Fazer Cadastro</h1>
                        <div className={style.content}>
                            <label className={style.label} htmlFor="name">Nome</label>

                            <input className={style.input} id="name" onChange={(e) => setName(e.target.value)} type="text" placeholder="Seu nome"/>
                        </div>
                        <div className={style.content}>
                            <label className={style.label} htmlFor="email">Email</label>

                            <input className={style.input} id="email" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Seu email" />
                        </div>
                        <div className={style.content}>
                            <label className={style.label} htmlFor="pass">Senha</label>

                            <input className={style.input} id="pass" onChange={(e) => setPassWord(e.target.value)} type="password" placeholder="crie uma senha forte"/>
                        </div>
                        <div className={style.linkContentC}>
                            <Link to={"/"} className={style.linkReact}>
                                <p className={style.link}>Já tenho conta!</p>
                            </Link>
                        </div>
                        <button className={style.but} onClick={seveData}>Cadastrar</button>
                    </form>
                </div>
                <div>
                    imagem
                </div>
                
            </main>
        </div>
    )
}

export default Registration