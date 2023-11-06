import { fail, type Action, type Actions } from "@sveltejs/kit";
import {
  encrypt,
  decrypt,
  type Encryption,
} from "$lib/server/EncryptionHandler.svelte";
import { firebaseAuth } from "$lib/firebaseinit";
let encrypted: Encryption = { iv: "", data: "" };

export const load = () => {
  return {iv: encrypted.iv, data: encrypted.data};
};
export const actions = {
  encrypt: async ({ cookies, request }) => {
    const data = await request.formData();
    const name = data.get("name");
    const id = data.get("id");
    const password = data.get("password") as string;
    const uid = data.get("uid");
    const obj = { name, id, password };


    if (!password || !id || !name) {
      return fail(400, { missing: "password, id or name" });
    }

    console.log("here");

    //@ts-ignore
    encrypted = encrypt(password, uid);
    return { success: true };
    //@ts-ignore
    const decrypted = decrypt(encrypted, uid);
    console.log(`decrypted: ${decrypted}`);

    console.log(obj);
    return obj;
  },
} satisfies Actions;
