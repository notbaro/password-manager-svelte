<script lang="ts">
  import { firebaseAuth } from "$lib/firebaseinit";
  import { createUserWithEmailAndPassword, type User } from "firebase/auth";
  import SuccessAlert from "$lib/SuccessAlert.svelte";
  import ErrorAlert from "$lib/ErrorAlert.svelte";
  import { onMount } from "svelte";
  import { errorCodeToMessage } from "$lib/utils";
  import { goto } from "$app/navigation";

  let message: String = "";
  let alertType: "success" | "error" | null = null;
  let user: User | null = null;
  let email = "";
  let password = "";

  onMount(() => {
    email = "";
    password = "";
  });

  /**
   * Creates a new user account with the provided email and password using Firebase authentication.
   * @returns {Promise<void>}
   */
  const createUser = async () => {
    try {
      const result = await createUserWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );
      message = `Successfully created user with email: ${email}. Redirecting...`;
      email = "";
      password = "";
      alertType = "success";
      setTimeout(() => {
        goto("/");
      }, 3000);
    } catch (error: any) {
      console.error(error.code);
      alertType = "error";
      message = errorCodeToMessage(error.code);
      setTimeout(() => {
        alertType = null;
        message = "";
      }, 3000);
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
      placeholder="Email"
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
      class="btn btn-primary btn-wide"
      on:click={createUser}>Sign Up</button
    >
  </form>
</div>

<style lang="postcss">
</style>
