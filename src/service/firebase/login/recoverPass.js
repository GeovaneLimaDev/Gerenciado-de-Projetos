import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebaseConfig";

async function recoverPass (email) {
    try{
        await sendPasswordResetEmail(auth, email);
        return "Email de recuperação enviado! Verifique sua caixa de entrada.";
    }catch(erro) {
         if (erro.code === "auth/invalid-email") {
            return "O email informado é inválido.";
        } else if (erro.code === "auth/user-not-found") {
            return "Nenhum usuário encontrado com esse email.";
        } else {
            return "Erro ao enviar email de recuperação. Tente novamente.";
        }
    }
}

export default recoverPass