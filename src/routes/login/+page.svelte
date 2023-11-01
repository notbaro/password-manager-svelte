<script lang="ts">
  import { firebaseApp, firebaseAuth, firestore } from "$lib/firebaseinit";
  import { signInWithEmailAndPassword, type User } from "firebase/auth";
  import { userCred } from "$lib/stores";
  import SuccessAlert from "$lib/SuccessAlert.svelte";
  import ErrorAlert from "$lib/ErrorAlert.svelte";
  import { onMount, tick } from "svelte";

  onMount(() => {
    $userCred.email = "";
    $userCred.password = "";
  });
  

  let user: User | null = null;
  let message: String = "";
  let alertType: "success" | "error" | null = null;

  const signInUser = async (): Promise<User | null> => {
    try {
      const result = await signInWithEmailAndPassword(
        firebaseAuth,
        $userCred.email,
        $userCred.password
      );
      message = `Successfully signed in user with email: ${$userCred.email}`;
      alertType = "success";
      return result.user;
    } catch (error: any) {
      alertType = "error";
      console.error(error.code);
      if (error.code === "auth/invalid-email") {
        message = "Invalid email";
      } else if (error.code === "auth/user-disabled") {
        message = "User disabled";
      } else if (error.code === "auth/user-not-found") {
        message = "User not found";
      } else if (error.code === "auth/invalid-login-credentials") {
        message = "Wrong email/password";
      } else if (error.code === "auth/missing-email") {
        message = "Please enter your email";
      } else if (error.code === "auth/missing-password") {
        message = "Missing password";
      } else {
        message = error.code;
      }
      return null;
    }
  };
</script>

{#if alertType === "success"}
  <SuccessAlert {message} />
{:else if alertType === "error"}
  <ErrorAlert {message} />
{/if}
<h1 class="text-3xl font-bold text-center">Log in with email and password</h1>
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
      user = await signInUser();
      console.log(user);
    }}>Log In</button
  >
  <button
    class="btn btn-accent btn-outline btn-wide"
    on:click={() => {
      console.log(firebaseAuth.currentUser);     
    }}>currentUser</button
  >
</div>

<style lang="postcss">
</style>
