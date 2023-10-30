<script lang="ts">
  import { userCred } from "$lib/stores";
</script>

<h1 class="text-3xl font-bold text-center">
  Log in with email and password
</h1>
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
  <button class="btn btn-accent btn-outline btn-wide">Log In</button>
</div>

<style lang="postcss">
</style>
