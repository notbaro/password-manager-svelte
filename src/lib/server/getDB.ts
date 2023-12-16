import { firestore } from "$lib/firebaseinit";
import { collection, getDocs } from "firebase/firestore";

interface PasswordEntry {
    site: string;
    id: string;
    iv: string;
    password: string;
  }
export default async function getDB(uid: string) {
  const docSnap = await getDocs(collection(firestore, uid));
  let data: PasswordEntry[] = [];
  docSnap.forEach((doc) => {
    data.push({
      site: doc.id,
      id: doc.data().id,
      iv: doc.data().iv,
      password: doc.data().password,
    });

  });
  return data;
}