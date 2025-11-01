import { doc, deleteDoc } from "firebase/firestore"
import { db } from "../firebaseConfig"

async function deletProject (id) {
    await deleteDoc(doc(db, "Project", id))
}

export default deletProject 