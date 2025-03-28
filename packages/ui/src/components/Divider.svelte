<svelte:options customElement={{ tag: "zr-divider", shadow: "none" }} />

<script>
  import { cva } from "class-variance-authority";
  const dividerVariants = cva("divider", {
    variants: {
      color: {
        undefined: [""],
        primary: ["divider-primary"],
        secondary: ["divider-secondary"],
        accent: ["divider-accent"],
        neutral: ["divider-neutral"],
        info: ["divider-info"],
        success: ["divider-success"],
        warning: ["divider-warning"],
        error: ["divider-error"],
      },
    },
  });
  let { color } = $props();
</script>

<div class={dividerVariants({ color })}></div>
