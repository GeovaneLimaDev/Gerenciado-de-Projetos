import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import login from "../../service/firebase/login/login"
import loginGoogle from "../../service/firebase/login/loginGoogle"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../service/firebase/firebaseConfig";
import RecoverPass from "../../components/popupRecover/RecoverForm";
import style from "./indexCSS.module.css"



function Login () {
    const [email, setEmail] = useState('')
    const [password, setPassWord] = useState('')
    const [recover, setRecover] = useState(false)
    const nav = useNavigate()
    document.title = 'Login'
     // useEffect observa se o usuario está logado
    useEffect(() => {
        onAuthStateChanged(auth, (usuario) => {
            if (usuario) {
                console.log("Usuário logado:", usuario);
                nav('/home/projetos')
            } else {
                console.log("Ninguém está logado");
            }
        })
    }, [])

    //funcção para o login com email e senha normal
    async function saveDate (e) {
        e.preventDefault()
        if(!email || !password){
            alert('Preencha todos os campos para fazer login!') 
            return
        }

        const res = await login(email, password)
        console.log(res)

        if(res != 'logado') {
            alert(res)
            return
        }
        nav('/home/projetos')

    } 

    // função para fazer login com google  
    async function google (e) {
        e.preventDefault()
        const res = await loginGoogle()
        console.log(res)
    }

    return(
        <div className={style.conteiner}>
            <main className={style.body}>
                <div>
                    imagem
                </div>
                <div className={style.formContent}>
                    <form action="" className={style.form}>
                        <h1 className={style.title}>Fazer Login</h1>
                        <div className={style.content}>
                            <label className={style.label} htmlFor="email">Email</label>

                            <input className={style.input} id="email" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                        </div>
                        <div className={style.content}>
                            <label className={style.label} htmlFor="pass">Senha</label>

                            <input className={style.input} id="pass" onChange={(e) => setPassWord(e.target.value)} type="password" placeholder="Sua senha"/>
                        </div>
                        <div className={style.butsContent}>
                            <div className={style.linkContent}>
                                <Link to={"/cadastro"} className={style.linkReact}>
                                    <p className={style.link}>Criar Conta</p>
                                </Link>
                    
                                <p onClick={( ) => {
                                    setRecover(true)
                                }} className={style.link}>esqueci minha senha!</p>
                            </div>
                            <button className={style.but} onClick={saveDate}>Entrar</button>
                        </div>
                        {recover && <RecoverPass setRecover={setRecover} />}
                        <button className={style.google} onClick={google}>
                            entrar com google
                        </button>
                    </form>
                </div>                
            </main>
        </div>

    )
}

export default Login