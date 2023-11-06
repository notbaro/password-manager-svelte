<script lang="ts">
  import { firebaseApp, firebaseAuth, firestore } from "$lib/firebaseinit";
  import { createUserWithEmailAndPassword, type User } from "firebase/auth";
  import SuccessAlert from "$lib/SuccessAlert.svelte";
  import ErrorAlert from "$lib/ErrorAlert.svelte";
  import { beforeUpdate, onDestroy, onMount } from "svelte";

  let message: String = "";
  let alertType: "success" | "error" | null = null;
  let user: User | null = null;
  let email = "";
  let password = "";

 onMount(() => {
   
        email = '';
        password = '';

});



  const createUser = async () => {
    try {
      const result = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      message = `Successfully created user with email: ${email}`;
      email = "";
      password = "";
      alertType = "success";
    } catch (error: any) {
      console.error(error.code);
      alertType = "error";
      if (error.code === "auth/email-already-in-use") {
        message = "Email already in use";
      } else if (error.code === "auth/invalid-email") {
        message = "Invalid email";
      } else if (error.code === "auth/weak-password") {
        message = "Password must be at least 6 characters";
      } else if (error.code === "auth/missing-email") {
        message = "Please enter your email";
      } else if (error.code === "auth/missing-password") {
        message = "Missing password";
      } else {
        message = "Unknown error";
      }
    }
  };
</script>

{#if alertType === "success"}
  <SuccessAlert {message} />
{:else if alertType === "error"}
  <ErrorAlert {message} />
{/if}
<div class="card">
  <h1 class="text-center text-3xl font-bold">
    Sign up with email and password
  </h1>
  <form
    class="form-control p-10 min-w-full container flex flex-col items-center"
  >
    <input
      class="input input-bordered"
      type="text"
      placeholder="Username"
      bind:value={email}
    />
    <input
      class="input input-bordered mb-5 mt-2"
      type="password"
      placeholder="Password"
      bind:value={password}
    />
    <button
      id="signupButton"
      class="btn btn-accent btn-outline btn-wide"
      on:click={createUser}>Sign Up</button
    >
  </form>
</div>

<style lang="postcss">
</style>
