import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebaseConfig"


async function getProject (user) {
    try{
        const q = query(collection(db, "Project"), where("userId", "==", user.uid))
        const snapshot = await getDocs(q)

        const list = []
        snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() }))

        return list

    }catch(erro) {
        return erro.message
    }
}

export default getProject