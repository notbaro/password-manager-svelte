import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import {type Encryption, decrypt} from "$lib/server/EncryptionHandler.svelte"

export const POST: RequestHandler = async ({request}) => {
  //@ts-ignore
  const {password, iv, uid} = await request.json();
  if (!password || !iv || !uid) {
    return json({ missing: "password, iv or uid" }, { status: 400 });
  }
  
  const encryption : Encryption = {
    iv: iv,
    data: password,
  };

  const decrypted = decrypt(encryption, uid);
  return json({ message: decrypted }, { status: 200 });
};