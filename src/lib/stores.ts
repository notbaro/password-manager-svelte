import { writable } from "svelte/store";
import type { User } from "firebase/auth";

export interface PasswordEntry {
  site: string;
  id: string;
  password: string;
}

const createPasswordEntries = () => {
  const { subscribe, set, update } = writable([] as PasswordEntry[]);

  return {
    subscribe,
    set,
    update,
    reset: () => set([]),
  }
}

export const passwordEntries = createPasswordEntries();