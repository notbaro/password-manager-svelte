<script context="module" lang="ts">
  import { createCipheriv, createDecipheriv } from "crypto";
  import { nanoid } from "nanoid";
  import {} from "buffer";

  const algorithm = "aes-256-ctr";

  export interface Encryption {
    iv: string;
    data: string;
  }
  export const encrypt = (password: string, uid: string): Encryption => {
    const iv = nanoid(16);
    const secret = uid.concat(uid.slice(uid.length - 4));
    const cipher = createCipheriv(algorithm, Buffer.from(secret), iv);
    const encrypted = Buffer.concat([cipher.update(password), cipher.final()]);
    return {
      iv: iv,
      data: encrypted.toString("hex"),
    };
  };

  export const decrypt = (encrypted: Encryption, uid: string): string => {
    const secret = uid.concat(uid.slice(uid.length - 4));
    const decipher = createDecipheriv(
      algorithm,
      Buffer.from(secret),
      Buffer.from(encrypted.iv)
    );
    const decrpyted = Buffer.concat([
      decipher.update(Buffer.from(encrypted.data, "hex")),
      decipher.final(),
    ]);
    return decrpyted.toString();
  };
</script>

<style lang="postcss">
</style>
