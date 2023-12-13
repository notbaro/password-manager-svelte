import { fail, type Action, type Actions } from "@sveltejs/kit";
import {
  encrypt,
  decrypt,
  type Encryption,
} from "$lib/server/EncryptionHandler.svelte";
import { firebaseAuth, firestore } from "$lib/firebaseinit";
import { collection, getDocs } from "firebase/firestore";
import { beforeUpdate } from "svelte";
interface pwEntry {
  site: string;
  id: string;
  iv: string;
  password: string;
}
let encrypted: Encryption = { iv: "", data: "" };
let pwEntries: pwEntry[] = []
let user = firebaseAuth.currentUser;

const fetchData = async () => {
    const docSnap = await getDocs(collection(firestore, String(user?.uid)));
    docSnap.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      pwEntries.push({
        site: doc.id,
        id: doc.data().id,
        iv: doc.data().iv,
        password: doc.data().password,
      });
    });
  };


beforeUpdate(async () => {

})
export const load = async () => {

  return { iv: encrypted.iv, data: encrypted.data, pwEntries: pwEntries };
};
export const actions = {
  encrypt: async ({ request }) => {
    const data = await request.formData();
    const name = data.get("name");
    const id = data.get("id");
    const password = data.get("password") as string;
    const uid = data.get("uid");


    if (!password || !id || !name) {
      return fail(400, { missing: "password, id or name" });
    }


    //@ts-ignore
    encrypted = encrypt(password, uid);
    return { success: true };
  },
  decrypt: async ({ request }) => {

  },
} satisfies Actions;
