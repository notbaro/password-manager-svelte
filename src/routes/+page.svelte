<script lang="ts">
  import { firebaseApp, firebaseAuth, firestore } from "$lib/firebaseinit";
  import { onAuthStateChanged, signOut, type User } from "firebase/auth";
  import UserCard from "./UserCard.svelte";
  import { onMount, tick } from "svelte";
  import { doc, setDoc } from "firebase/firestore";
  import { enhance } from "$app/forms";

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

  let name = "";
  let id = "";
  let password = "";
  const createDoc = async () => {
    //@ts-ignore
    await setDoc(doc(firestore, user?.uid, name), {
      id: id,
      password: password,
    });
  };

  const testEncrypt = () => {
    //@ts-ignore
    const encrypted = encrypt(password, user?.uid);
    console.log(encrypted);
    //@ts-ignore
    console.log(decrypt(encrypted, user?.uid));
  };
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
        on:click={createDoc}>Add Password</button
      >
      <button class="btn btn-accent btn-outline btn-wide" type="submit" />
    </form>
  {/if}
</div>

<style lang="postcss">
</style>
