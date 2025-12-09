import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebaseConfig"

export default async function updatedNotesProject (note) {
    try{
        const usuarioRef = doc(db, "NotesProject", note.id)

        await updateDoc(usuarioRef, note)

        return "Nota atualizada com sucesso!"
        
    }catch(erro){
        return erro
    }

}