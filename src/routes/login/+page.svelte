<script lang="ts">
  import { firebaseApp, firebaseAuth, firestore } from "$lib/firebaseinit";
  import { signInWithEmailAndPassword, type User } from "firebase/auth";
  import SuccessAlert from "$lib/SuccessAlert.svelte";
  import ErrorAlert from "$lib/ErrorAlert.svelte";
  import { beforeUpdate, onMount, tick } from "svelte";
  import { goto } from "$app/navigation";

  let email = "";
  let password = "";

  let message: String = "";
  let alertType: "success" | "error" | null = null;
  onMount(() => {
    email = "";
    password = "";
  });

  const signInUser = async () => {
    try {
      const result = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      message = `Successfully signed in user with email: ${email}. Redirecting...`;
      alertType = "success";
      email = "";
      password = "";
      setTimeout(() => {
        goto("/");
      }, 2000);
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
    Log In with email and password
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
      on:click={signInUser}>Log In</button
    >
  </form>
</div>

<style lang="postcss">
</style>
