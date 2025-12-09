import { setDoc, doc } from "firebase/firestore"
import { db } from "../firebaseConfig"

export default async function addNoteProject (note) {
    try{
        await setDoc(doc(db, "NotesProject", note.id), note)
        return "Nota criada com sucesso!"
    }catch(erro){
        return erro
    }

}