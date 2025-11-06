import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebaseConfig"


async function getTask (user, id) {
    try{
        const q = query(collection(db, "SubTask"), where("userId", "==", user.uid), where('idPai', '==', id))
        // coloquei uma condição a mais para buscar no campo, o idPai da task tem que ser igual ao id do projeto pai. Assim evito que apareça em um projeto,, task que não tem nada a ver com ele.
        const snapshot = await getDocs(q)

        const list = []
        snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() }))

        return list

    }catch(erro) {
        return erro.message
    }
}

export default getTask