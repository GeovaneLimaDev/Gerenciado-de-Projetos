import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebaseConfig"

async function updatService (newProject, uid) {
    try {
        // Referência ao documento do usuário
        const usuarioRef = doc(db, "usuarios", uid);

        // Atualiza os campos do documento
        await updateDoc(usuarioRef, novosDados);

        console.log("Documento atualizado com sucesso!");
    } catch (error) {
        console.error("Erro ao atualizar documento:", error);
    }
}

export default updatService