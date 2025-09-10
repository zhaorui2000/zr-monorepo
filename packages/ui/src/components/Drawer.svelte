<script>
  import { cva, cx } from "class-variance-authority";
  const { sidebar, children, width = 80, side, btnProps } = $props();
  let checkBox;
  const drawerVariants = cva("drawer", {
    variants: {
      side: {
        left: "",
        right: "drawer-end",
      },
    },
  });
</script>

<div class={cx("z-[9999]", drawerVariants({ side }))}>
  <input
    bind:this={checkBox}
    id="my-drawer"
    type="checkbox"
    class="drawer-toggle"
  />
  <div class="drawer-content">
    {@render children?.({
      onclick: () => {
        checkBox.checked = true;
      },
    })}
  </div>
  <div class="drawer-side">
    <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"
    ></label>
    <div
      class="bg-base-200 text-base-content h-screen p-2"
      style="width: {width}%"
    >
      {@render sidebar?.()}
    </div>
  </div>
</div>
