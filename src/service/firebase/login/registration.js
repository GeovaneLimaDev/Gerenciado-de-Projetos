import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export async function registrationFire (user){
    try{
        const userCreedential = await createUserWithEmailAndPassword(auth, user.email, user.password)
        return 'feito'
    }catch(erro){
        let mensagem = ''

        switch(erro.code) {
             case "auth/email-already-in-use":
                mensagem = "Este email já está em uso.";
                break;
            case "auth/invalid-email":
                mensagem = "O email informado é inválido.";
                break;
            case "auth/weak-password":
                mensagem = "A senha deve ter pelo menos 6 caracteres.";
                break;
            default:
                mensagem = "Ocorreu um erro ao registrar o usuário.";
                }

        return mensagem

        }
        
}