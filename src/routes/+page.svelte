<script lang="ts">
  import { firebaseApp, firebaseAuth, firestore } from "$lib/firebaseinit";
  import { onAuthStateChanged, signOut, type User } from "firebase/auth";
  import UserCard from "./UserCard.svelte";
  import { onMount, tick } from "svelte";

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
</script>

<h1 class="text-3xl font-bold m-5 text-center">Password Manager</h1>
<div class="form-control p-10 min-w-full container flex flex-col items-center">
  {#if user}
    <h2 class="text-2xl font-bold m-5 text-center">Hello, {user?.email}</h2>
  {/if}
</div>

<style lang="postcss">
</style>
