<script lang="ts">
  import { firebaseApp, firebaseAuth, firestore } from "$lib/firebaseinit";
  import { onAuthStateChanged, signOut, type User } from "firebase/auth";
  import UserCard from "./UserCard.svelte";
  import { beforeUpdate, onMount, tick } from "svelte";
  import { collection, doc, getDocs, setDoc } from "firebase/firestore";
  import { enhance } from "$app/forms";
  import { stringify } from "postcss";

  export let data;
  export let user: User | null = firebaseAuth.currentUser;
  onMount(async () => {
    await tick();
    user = firebaseAuth.currentUser;
  });
  onAuthStateChanged(firebaseAuth, (u) => {
    if (u) {
      user = u;
    } else {
      user = null;
    }
  });
  class PasswordEntry {
    site: string;
    id: string;
    iv: string;
    password: string;
    constructor(site: string, id: string, iv: string, password: string) {
      this.site = site;
      this.id = id;
      this.iv = iv;
      this.password = password;
    }
  }
  let name = "";
  let id = "";
  let password = "";
  let pwEntries: PasswordEntry[] = [];

  const createDoc = async () => {
    //@ts-ignore
    await setDoc(doc(firestore, user?.uid, name), {
      id: id,
      password: data.data,
      iv: data.iv,
    });
  };

  const test = async () => {
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
    await tick();
  });
</script>

<h1 class="text-3xl font-bold m-5 text-center">Password Manager</h1>
<div class="form-control p-10 min-w-full container flex flex-col items-center">
  {#if user}
    <h2 class="text-2xl font-bold m-5 text-center">Hello, {user?.email}</h2>
    <form
      class="form-control p-10 min-w-full container flex flex-col items-center"
      method="POST"
      action="?/encrypt"
      use:enhance
    >
      <input
        class="input input-bordered mt-2"
        type="text"
        placeholder="Name of the website/app"
        name="name"
        bind:value={name}
      />
      <input
        class="input input-bordered mt-2"
        type="text"
        placeholder="Username/Email"
        name="id"
        bind:value={id}
      />
      <input
        class="input input-bordered mb-5 mt-2"
        type="password"
        placeholder="Password"
        name="password"
        bind:value={password}
      />
      <input type="hidden" name="uid" value={user?.uid} />
      <button
        id="signupButton"
        class="btn btn-accent btn-outline btn-wide"
        type="submit"
        on:click={createDoc}>Add Password</button
      >
      <!--TODO inplement post req-->
      <button
        class="btn btn-accent btn-outline btn-wide"
        on:click={async () => {
          const res = await fetch("/api/decrypt", {
            method: "POST",
            body: JSON.stringify({
             password: pwEntries[0].password,
              iv: pwEntries[0].iv,
              uid: user?.uid,
            }),
            headers: {
              "content-type": "application/json",
            },
          });
          const d = await res.json();
          console.log(d);
        }}>test</button
      >
    </form>
  {/if}
</div>

<style lang="postcss">
</style>
