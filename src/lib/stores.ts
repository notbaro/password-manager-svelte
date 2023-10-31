import { writable } from "svelte/store";
import {type User } from "firebase/auth";

export interface Cred {
  username: string;
  password: string;
}

export const userCred = writable({
  email: "",
  password: "",
});

