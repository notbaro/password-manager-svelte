<script lang="ts">
  import { firebaseAuth } from "$lib/firebaseinit";
  import { signOut } from "firebase/auth";
  import UserCard from "./UserCard.svelte";
  import { goto } from "$app/navigation";

  const logout = async () => {
    try {
      await signOut(firebaseAuth);
    } catch (error: any) {
      alert(error.code);
    }
  };
  async function routeToPage(route: string, replaceState: boolean) {
    goto(`/${route}`, { replaceState });
  }
</script>

<li>
  <div class="dropdown dropdown-hover dropdown-end">
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <label
      tabindex="0"
      class="btn btn-ghost normal-case text-xl navbar-center hover:bg-secondary-focus"
      ><i class="fa-solid fa-user fa-xl" style="color: #ffffff;" /></label
    >
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <div tabindex="0" class="dropdown-content z-[1] card card-compact w-64 p-2 shadow bg-white text-black">
      <div class="card-body">
        <h3 class="card-title text-center">Currently logged in as
          <br />
          {firebaseAuth.currentUser?.email}</h3>
          <button
          class="btn btn-secondary w-full"
          on:click={() => {
            logout();
            // @ts-ignore
            document.location.reload();
          }}>Log out</button
        >
      </div>
    </div>
  </div>
</li>

<style lang="postcss">
</style>
