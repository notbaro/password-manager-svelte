<script>
  import "../app.css";
  import { onNavigate } from "$app/navigation";
  import { page } from "$app/stores";
  import { onMount, tick } from "svelte";
  import { firebaseAuth } from "$lib/firebaseinit";
  import { onAuthStateChanged } from "firebase/auth";
  import DropdownProfile from "./DropdownProfile.svelte";

  let isLoggedIn = firebaseAuth.currentUser !== null;
  onAuthStateChanged(firebaseAuth, (u) => {
    if (u) {
      isLoggedIn = true;
    } else {
      isLoggedIn = false;
    }
  });
  onMount(async () => {
    await tick();
  });
</script>

<nav class="navbar bg-primary text-primary-content mb-5">
  <div class="navbar-start">
    <a href="/" class="text-2xl pl-5 normal-case font-semibold"
      >Password Manager</a
    >
  </div>
  <div class="navbar-end">
    <ul class="flex">
      <li aria-current={$page.url.pathname === "/" ? "page" : undefined}>
        <a
          href="/"
          class="btn btn-ghost normal-case text-xl navbar-center hover:bg-secondary-focus {$page
            .url.pathname === '/'
            ? 'bg-accent'
            : ''}">Home</a
        >
      </li>
      {#if !isLoggedIn}
        <li
          aria-current={$page.url.pathname === "/signup" ? "page" : undefined}
        >
          <a
            href="/signup"
            class="btn btn-ghost normal-case text-xl navbar-center hover:bg-secondary-focus {$page
              .url.pathname === '/signup'
              ? 'bg-accent'
              : ''}">Sign Up</a
          >
        </li>
        <li aria-current={$page.url.pathname === "/login" ? "page" : undefined}>
          <a
            href="/login"
            class="btn btn-ghost normal-case text-xl navbar-center hover:bg-secondary-focus {$page
              .url.pathname === '/login'
              ? 'bg-accent'
              : ''}">Log in</a
          >
        </li>
      {:else}
        <DropdownProfile />
      {/if}
    </ul>
  </div>
</nav>

<slot />
