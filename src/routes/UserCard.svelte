<script lang="ts">
  export let CardTitle: string | null;
</script>

<div class="card w-96 bg-neutral text-neutral-content justify-center">
  <div class="card-body items-center text-center">
    <h2 class="card-title">{CardTitle}</h2>
    <div class="card-actions justify-end">
      <slot />
    </div>
  </div>
</div>

<style lang="postcss">
</style>
