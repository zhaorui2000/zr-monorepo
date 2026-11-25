<script>
  import { cva } from "class-variance-authority";
  import { cn } from "./common/cn.js";

  let {
    sidebar,
    children,
    width = 80,
    side = /** @type {string} */ ("left"),
    btnProps = undefined,
    open = $bindable(false),
    className = "",
    ...restProps
  } = $props();

  const id = $props.id();

  const drawerVariants = cva("drawer", {
    variants: {
      side: {
        left: "",
        right: "drawer-end",
      },
    },
  });
</script>

<div
  class={cn("z-overlay", drawerVariants({ side }), className)}
  onkeydown={(event) => {
    if (event.key === "Escape") open = false;
  }}
  {...restProps}
>
  <input
    {id}
    bind:checked={open}
    type="checkbox"
    class="drawer-toggle"
    aria-label="切换抽屉"
  />
  <div class="drawer-content">
    {@render children?.({
      onclick: () => {
        open = true;
      },
    })}
  </div>
  <div class="drawer-side">
    <label for={id} aria-label="关闭抽屉" class="drawer-overlay"></label>
    <div
      class="bg-base-200 text-base-content h-screen p-2"
      style="width: {width}%"
    >
      {@render sidebar?.()}
    </div>
  </div>
</div>
