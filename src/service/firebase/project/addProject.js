import { setDoc, doc } from "firebase/firestore"
import { db } from "../firebaseConfig"

async function addProject (project) {
    try{
        await setDoc(doc(db, "Project", project.id), project)
        return 'deu certo'
    }catch (erro) {
        return erro.message
    }
}

export default addProject