import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebaseConfig";

async function recoverPass () {
    try{
        await sendPasswordResetEmail(auth, email);
        return "Email de recuperação enviado! Verifique sua caixa de entrada.";
    }catch(erro) {

    }
}

export default recoverPass