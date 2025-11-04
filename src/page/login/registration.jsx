import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { registrationFire } from "../../service/firebase/login/registration";
import { emailValidation, passWordValidation } from "../../utils/validators";


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
        <div>
            <main>
                <h1>Fazer Cadastro</h1>
                <form action="">
                    <div>
                        <input onChange={(e) => setName(e.target.value)} type="text" placeholder="Seu nome"/>
                    </div>
                    <div>
                        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Seu email" />
                    </div>
                    <div>
                        <input onChange={(e) => setPassWord(e.target.value)} type="password" placeholder="crie uma senha forte"/>
                    </div>
                    <div>
                    <Link to={"/"}>
                        <p>Já tenho conta!</p>
                    </Link>
                    <button onClick={seveData}>Cadastrar</button>
                </div>
                </form>
                
            </main>
        </div>
    )
}

export default Registration