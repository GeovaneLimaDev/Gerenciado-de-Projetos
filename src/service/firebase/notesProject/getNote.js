import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../firebaseConfig"
import { auth } from "../firebaseConfig"

export default async function getNoteProject (id) {
    const user = auth.currentUser
    try{
        const q =  query(collection(db, "NotesProject"), where("userId", "==", user.uid), where("idPai", "==", id))

        const snapShot = await getDocs(q)

        const list = []
        snapShot.forEach(doc => list.push({id: doc.id, ...doc.data() }))

        return list
    }catch(erro){
        return []
    }
}