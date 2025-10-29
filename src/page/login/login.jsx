import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import login from "../../service/firebase/login/login"
import loginGoogle from "../../service/firebase/login/loginGoogle"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../service/firebase/firebaseConfig";
import RecoverPass from "../../components/popupRecover/RecoverForm";



function Login () {
    const [email, setEmail] = useState('')
    const [password, setPassWord] = useState('')
    const [recover, setRecover] = useState(false)
    const nav = useNavigate()

     // useEffect observa se o usuario está logado
    useEffect(() => {
        onAuthStateChanged(auth, (usuario) => {
            if (usuario) {
                console.log("Usuário logado:", usuario);
                nav('/home')
            } else {
                console.log("Ninguém está logado");
            }
        })
    })

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
        nav('/home')

    } 

    // função para fazer login com google  
    async function google (e) {
        e.preventDefault()
        const res = await loginGoogle()
        console.log(res)
    }

    return(
        <div>
            <main>
                <h1>Fazer Login</h1>

                <form action="">
                    <div>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                    </div>
                    <div>
                        <input onChange={(e) => setPassWord(e.target.value)} type="password" placeholder="Sua senha"/>
                    </div>
                    <div>
                        <div>
                            <Link to={"/cadastro"}>
                                <p>Criar Conta</p>
                            </Link>
                            
                            <p onClick={( ) => {
                                setRecover(true)
                            }}>esqueci minha senha!</p>
                        </div>

                        <button onClick={saveDate}>Entrar</button>
                    </div>
                    {recover && <RecoverPass setRecover={setRecover} />}

                    <button onClick={google}>
                        entrar com google
                    </button>
                </form>

                
            </main>
        </div>

    )
}

export default Login