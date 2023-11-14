<script context="module" lang="ts">
  import { createCipheriv, createDecipheriv } from "crypto";
  import { nanoid } from "nanoid";
  import {} from "buffer";

  /**
   * Encryption algorithm used for password encryption and decryption
   */
  const algorithm = "aes-256-ctr";

  /**
   * Defines an interface for encryption data.
   */
  export interface Encryption {
    iv: string;
    data: string;
  }
  /**
   * Encrypts a password using a unique identifier (uid) and returns an Encryption object containing the initialization vector (iv) and the encrypted data.
   * @param {string} password - The password to be encrypted.
   * @param {string} uid - A unique identifier used to generate the encryption key.
   * @returns {Encryption} An object containing the initialization vector (iv) and the encrypted data.
   */
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

  /**
   * Decrypts the given encrypted data using the provided uid.
   * @param {Encryption} encrypted - The encrypted data to be decrypted.
   * @param {string} uid - The unique identifier used to decrypt the data.
   * @returns {string} - The decrypted data.
   */
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
