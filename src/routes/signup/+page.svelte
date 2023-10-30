<script lang="ts">
  import { firebaseApp, firebaseAuth, firestore } from "$lib/firebaseinit";
  import { createUserWithEmailAndPassword, type User } from "firebase/auth";
  import { userCred } from "$lib/stores";
  import SucessAlert from "./SucessAlert.svelte";
  import ErrorAlert from "./ErrorAlert.svelte";

  let message: String = "";
  let alertType: "success" | "error" | null = null;
  let user: User | null = null;

  const createUser = async (): Promise<User | null> => {
    try {
      const result = await createUserWithEmailAndPassword(
        firebaseAuth,
        $userCred.email,
        $userCred.password
      );
      message = `Successfully created user with email: ${$userCred.email} and password: ${$userCred.password}`;
      alertType = "success";
      return result.user;
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
      return null;
    }
  };
</script>

{#if alertType === "success"}
  <SucessAlert {message} />
{:else if alertType === "error"}
  <ErrorAlert {message} />
{/if}
<h1 class="text-center text-3xl font-bold">Sign up with email and password</h1>
<div class="form-control p-10 min-w-full container flex flex-col items-center">
  <input
    class="input input-bordered"
    type="text"
    placeholder="Username"
    bind:value={$userCred.email}
  />
  <input
    class="input input-bordered mb-5 mt-2"
    type="password"
    placeholder="Password"
    bind:value={$userCred.password}
  />
  <button
    class="btn btn-accent btn-outline btn-wide"
    on:click={async () => {
      user = await createUser();
      console.log(user?.email);
    }}>Sign Up</button
  >
</div>

<style lang="postcss">
</style>
