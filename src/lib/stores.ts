import { writable } from "svelte/store";

export interface Cred {
  username: string;
  password: string;
}

export const userCred = writable({
  email: "",
  password: "",
});

