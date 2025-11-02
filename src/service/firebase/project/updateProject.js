import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebaseConfig"

async function updatProject (newProject) {
    try {
        // Referência ao documento do usuário
        const usuarioRef = doc(db, "Project", newProject.id);

        // Atualiza os campos do documento
        await updateDoc(usuarioRef, newProject);

        console.log("Documento atualizado com sucesso!");
    } catch (error) {
        console.error("Erro ao atualizar documento:", error);
    }
}

export default updatProject