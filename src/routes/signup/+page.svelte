<script lang="ts">
  import { firebaseAuth } from "$lib/firebaseinit";
  import { createUserWithEmailAndPassword, type User } from "firebase/auth";
  import SuccessAlert from "$lib/SuccessAlert.svelte";
  import ErrorAlert from "$lib/ErrorAlert.svelte";
  import { onMount } from "svelte";
  import { errorCodeToMessage } from "$lib/utils";

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
      message = `Successfully created user with email: ${email}`;
      email = "";
      password = "";
      alertType = "success";
    } catch (error: any) {
      console.error(error.code);
      alertType = "error";
      message = errorCodeToMessage(error.code);
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
