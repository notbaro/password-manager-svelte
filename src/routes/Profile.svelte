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
  <button
    class="btn btn-ghost normal-case text-xl navbar-center hover:bg-secondary-focus"
    on:click={() => {
      // @ts-ignore
      document.getElementById("modal").showModal();
    }}><i class="fa-solid fa-user fa-xl" style="color: #ffffff;" /></button
  >
</li>
<dialog id="modal" class="modal">
  <div class="modal-box justify-center items-center">
    <h2 class="text-3xl font-bold m-5 text-center">
      Currently logged in as
      <br />
      {firebaseAuth.currentUser?.email}
    </h2>
    <button
      class="btn btn-secondary btn-outline btn-wide relative right-2"
      on:click={() => {
        logout();
        // @ts-ignore
        document.getElementById("modal").close();
        document.location.reload();
      }}>Log out</button
    >
  </div>
  <form class="modal-backdrop" method="dialog">
    <button>close</button>
  </form>
</dialog>

<style lang="postcss">
</style>
