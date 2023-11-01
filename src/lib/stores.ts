import { writable } from "svelte/store";
import type { User } from "firebase/auth";

export interface Cred {
  username: string;
  password: string;
}

function createCred() {
  const { subscribe, set, update } = writable({
    email: "",
    password: "",
  });
  return {
    subscribe,
    set,
    reset: () => set({ email: "", password: "" }),
  };
}

export const userCred = createCred();
