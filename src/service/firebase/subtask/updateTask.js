import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebaseConfig"

async function updateTask (NewSubTask) {
    try {
        // Referência ao documento do usuário
        const usuarioRef = doc(db, "SubTask", NewSubTask.id);

        // Atualiza os campos do documento
        await updateDoc(usuarioRef, NewSubTask);

        return "Documento atualizado com sucesso!"
    } catch (error) {
        return error;
    }
}

export default updateTask