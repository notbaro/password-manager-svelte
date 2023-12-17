<script lang="ts">
  import { firebaseApp, firebaseAuth, firestore } from "$lib/firebaseinit";
  import { onAuthStateChanged, signOut, type User } from "firebase/auth";
  import UserCard from "./UserCard.svelte";
  import { beforeUpdate, onMount, tick } from "svelte";
  import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    onSnapshot,
    query,
    setDoc,
  } from "firebase/firestore";
  import { enhance } from "$app/forms";
  import { passwordEntries } from "$lib/stores";
  import SuccessAlert from "$lib/SuccessAlert.svelte";
  import ErrorAlert from "$lib/ErrorAlert.svelte";

  export let user: User | null = firebaseAuth.currentUser;
  onMount(async () => {
    user = firebaseAuth.currentUser;
  });
  onAuthStateChanged(firebaseAuth, (u) => {
    if (u) {
      user = u;
    } else {
      user = null;
    }
  });
  interface PasswordEntry {
    site: string;
    id: string;
    password: string;
  }
  let name = "";
  let id = "";
  let password = "";
  let pwEntries: PasswordEntry[] = [];
  let init = false;
  let message: String = "";
  let alertType: "success" | "error" | null = null;

  const createDoc = async () => {
    if (!name || !id || !password) {
      alertType = "error";
      message = "Please fill all the fields";
      setTimeout(() => {
        alertType = null;
        message = "";
      }, 3000);
    }
    //@ts-ignore
    await setDoc(doc(firestore, user?.uid, name), {
      id: id,
      password: password,
    });
    pwEntries.push({ site: name, id: id, password: password });
    updateStore();
  };

  const updateStore = async () => {
    const docsnap = await getDocs(collection(firestore, String(user?.uid)));
    let pwe: PasswordEntry[] = [];
    docsnap.forEach((doc) => {
      pwe.push({
        site: doc.id,
        id: doc.data().id,
        password: doc.data().password,
      });
    });
    console.log(pwe);
    passwordEntries.set(pwe);
    init = true;
    alertType = "success";
    message = "Password entry changed successfully";
    setTimeout(() => {
      alertType = null;
      message = "";
    }, 3000);
  };

  const deleteEntry = async (i: number) => {
    await deleteDoc(
      doc(firestore, String(user?.uid), $passwordEntries[i].site)
    );
    await updateStore();
  };
</script>

{#if alertType === "success"}
  <SuccessAlert {message} />
{:else if alertType === "error"}
  <ErrorAlert {message} />
{/if}
<h1 class="text-3xl font-bold m-5 text-center">Password Manager</h1>
<div class="form-control p-10 min-w-full container flex flex-col items-center">
  {#if user}
    <h2 class="text-2xl font-bold m-5 text-center">Hello, {user?.email}</h2>
  {/if}
  {#if init}
    
    <form
      class="form-control p-10 min-w-full container flex flex-col items-center"
    >
      <input
        required
        class="input input-bordered mt-2"
        type="text"
        placeholder="Name of the website/app"
        name="name"
        bind:value={name}
      />
      <input
        required
        class="input input-bordered mt-2"
        type="text"
        placeholder="Username/Email"
        name="id"
        bind:value={id}
      />
      <input
        required
        class="input input-bordered mb-5 mt-2"
        type="text"
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
    </form>
    {#key $passwordEntries}
      {#each $passwordEntries as entry, i}
        <div class="collapse collapse-arrow bg-base-200 w-96">
          <input type="radio" name="my-accordion-2" />
          <div class="collapse-title text-xl font-medium">{entry.site}</div>
          <div class="collapse-content flex justify-between">
            <div class="flex-grow">
              <p>{entry.id}</p>
              <p>{entry.password}</p>
            </div>
            <div>
              <button
                class="btn btn-circle btn-error btn-outline"
                on:click={async () => {
                  await deleteEntry(i);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  /></svg
                >
              </button>
            </div>
          </div>
        </div>
      {/each}
    {/key}
  {/if}
  {#if !init && user}
    <button class="btn btn-accent btn-outline btn-wide" on:click={updateStore}
      >Show Passwords</button
    >
  {/if}
</div>

<style lang="postcss">
</style>
