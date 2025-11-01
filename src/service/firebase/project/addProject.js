import { setDoc, doc } from "firebase/firestore"
import { db } from "../firebaseConfig"

async function addProject (project) {
    try{
        await setDoc(doc(db, "Project", project.id), project) // adiciona o projeto a seção 'Project' do meu banco de dados
        return 'deu certo'
    }catch (erro) {
        return erro.message
    }
}

export default addProject