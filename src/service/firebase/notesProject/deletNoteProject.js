import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default async function deletNote (id) {
    await deleteDoc(doc(db, "NotesProject", id))
}