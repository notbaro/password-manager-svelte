<script lang="ts">
  import { initializeApp } from "firebase/app";
  import { getAnalytics } from "firebase/analytics";
  import { getFirestore, doc, setDoc } from "firebase/firestore";
  import {
    getAuth,
    connectAuthEmulator,
    signInWithPopup,
    GoogleAuthProvider,
    type User,
    signInWithEmailAndPassword,
  } from "firebase/auth";
  import jQuery from "jquery";
  import { onMount } from "svelte";
  import { userCred } from "$lib/stores";

  const firebaseConfig = {
    apiKey: "AIzaSyAMWtNqS5aMhd2jnaTMTt0bMf3sQMu-HAA",
    authDomain: "password-manager-5a32a.firebaseapp.com",
    projectId: "password-manager-5a32a",
    storageBucket: "password-manager-5a32a.appspot.com",
    messagingSenderId: "76400488085",
    appId: "1:76400488085:web:9293466d9d7f223d91b59c",
    measurementId: "G-7RM96GCBYY",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  //connectAuthEmulator(auth, "http://localhost:9099");

  const signIn = async (): Promise<User | null> => {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        $userCred.email,
        $userCred.password
      );
      return result.user;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  //make Google icon beat on hover
  onMount(() => {
    // @ts-ignore
    window.$ = window.jQuery = jQuery;
    jQuery("button").hover(
      function () {
        jQuery(this).children().addClass("fa-beat");
      },
      function () {
        jQuery(this).children().removeClass("fa-beat");
      }
    );
  });
  let usr: Promise<User | null>;
  const clickHandler = () => {
    usr = signIn();
  };
  //export let inputHandler = (data) => {};
</script>

<input
  class="input input-bordered"
  type="text"
  placeholder="Username"
  bind:value={$userCred.email}
/>
<input
  class="input input-primary mt-3 mb-5"
  type="password"
  placeholder="Password"
  bind:value={$userCred.password}
/>
<button class="btn btn-accent btn-outline btn-wide" on:click={clickHandler}>
  <i class="fa-brands fa-google fa-xl" />Sign In With Google</button
>

<button
  class="btn btn-accent btn-outline btn-wide"
  on:click={() => {
    console.log(usr);
  }}>Debug</button
>
