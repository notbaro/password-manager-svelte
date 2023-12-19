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
    <label class="flex cursor-pointer gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        ><circle cx="12" cy="12" r="5" /><path
          d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
        /></svg
      >
      <input
        type="checkbox"
        value="dark"
        class="toggle theme-controller"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        ><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg
      >
    </label>
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
