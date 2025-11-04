import { setDoc, doc } from "firebase/firestore"
import { db } from "../firebaseConfig"

async function addTask (task) {
    try{
        await setDoc(doc(db, "SubTask", task.id), task) // adiciona o projeto a seção 'Project' do meu banco de dados
        return 'deu certo'
    }catch (erro) {
        return erro.message
    }
}

export default addTask