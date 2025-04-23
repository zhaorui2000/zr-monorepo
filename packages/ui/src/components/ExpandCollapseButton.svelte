<script>
  import { fade } from "svelte/transition";
  import Button from "./Button.svelte";
  import Icon from "./Icon.svelte";
  let { buttons } = $props();
  let show = $state(false);
</script>

<div
  class="flex justify-end items-center gap-2"
  transition:fade={{ duration: 300 }}
>
  {@render buttons?.()}
  <Button onclick={() => (show = !show)} circle responsive>
    <Icon responsive iconClass="icon-[material-symbols--more-horiz]"></Icon>
  </Button>
</div>
