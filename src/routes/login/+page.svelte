<script lang="ts">
  import { firebaseAuth } from "$lib/firebaseinit";
  import {
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
  } from "firebase/auth";
  import SuccessAlert from "$lib/SuccessAlert.svelte";
  import ErrorAlert from "$lib/ErrorAlert.svelte";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation"
  import {errorCodeToMessage} from '$lib/utils'


  let email = "";
  let password = "";

  let message: String = "";
  let alertType: "success" | "error" | null = null;
  onMount(() => {
    email = "";
    password = "";
  });

  /**
   * Sign in user with email and password.
   * @returns {Promise<void>}
   */
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
      message = errorCodeToMessage(error.code); 
    }
  };

  /**
   * Sends a password reset email to the user's email address.
   * @returns {Promise<void>}
   */
  const resetPassword = async (): Promise<void> => {
    sendPasswordResetEmail(firebaseAuth, email)
      .then(() => {
        message = `Password reset email sent to ${email}.`;
        alertType = "success";
        document.getElementById("modalClose")?.click();
      })
      .catch((error) => {
        message = errorCodeToMessage(error.code);  
        alertType = "error";
      });
  };

  
</script>

{#if alertType === "success"}
  <SuccessAlert {message} />
{:else if alertType === "error"}
  <ErrorAlert {message} />
{/if}
<div class="card">
  <h1 class="text-center text-3xl font-bold">Log In with email and password</h1>
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
      class="btn btn-accent btn-outline btn-wide"
      on:click={signInUser}>Log In</button
    >
    <button
      class="btn btn-accent btn-outline btn-wide"
      onclick="resetPwdModal.showModal()">Reset Password</button
    >
    <dialog id="resetPwdModal" class="modal">
      <div class="modal-box flex flex-col items-center">
        <h3 class="font-bold text-lg">Reset Password</h3>
        <input
          class="input input-bordered border-primary my-4"
          type="email"
          placeholder="Email"
          bind:value={email}
        />
        <button
          class="btn btn-accent btn-outline btn-wide"
          on:click={resetPassword}>Send to email</button
        >
      </div>
      <form method="dialog" class="modal-backdrop">
        <button id="modalClose">close</button>
      </form>
    </dialog>
  </form>
</div>

<style lang="postcss">
</style>
