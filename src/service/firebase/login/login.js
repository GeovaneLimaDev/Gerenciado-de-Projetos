import { auth } from "../firebaseConfig"
import { signInWithEmailAndPassword } from "firebase/auth"

async function login (email, password) {
    try{
        const userCredencial = await signInWithEmailAndPassword(auth, email, password)
        return 'logado'
    }catch(erro){
        let mensagem = "";

        switch (erro.code) {
            case "auth/invalid-email":
                mensagem = "O email informado é inválido.";
                break;
            case "auth/user-disabled":
                mensagem = "Esta conta foi desativada.";
                break;
            case "auth/user-not-found":
                mensagem = "Nenhuma conta encontrada com este email.";
                break;
            case "auth/wrong-password":
                mensagem = "Senha incorreta.";
                break;
            default:
                mensagem = "Erro ao fazer login. Tente novamente.";
 
        }
        return mensagem
    }
}

export default login