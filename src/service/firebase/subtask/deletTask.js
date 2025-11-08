import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default  async function deletTask (id) {
    await deleteDoc(doc(db, "SubTask", id))
}