import { useState } from "react"
import { emailValidation } from "../../utils/validators"
import recoverPass from "../../service/firebase/login/recoverPass"

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
        <div>
            <aside>
                <h3>Email de recuperação</h3>
                <div>
                    <input onChange={(e) => setEmail(e.target.value)} type="email"  />
                </div>
                <button onClick={recover}>Recuperar</button>
            </aside>
        </div>
    )
}

export default RecoverPass