<script>
  import Block from "@zr/ui/Block";
  import { cx, cva } from "class-variance-authority";

  // 纯受控组件：视觉完全由 checked 驱动，无内部状态。
  // 这样撤销 / 重置 / clearMinus 等外部 store 变更都能可靠同步到视图。
  let {
    checked = false,
    isTranslucen = false,
    disable = false,
    onChange,
    className = "",
    children,
  } = $props();

  const floorVariants = cva(
    "relative rounded-lg border flex items-center justify-center select-none transition-all duration-500 ease-in-out hover:scale-105 active:scale-95",
    {
      variants: {
        state: {
          off: "bg-gradient-to-br from-blue-50 via-blue-200/50 to-blue-100 border-blue-200 shadow-lg shadow-blue-200/50 hover:shadow-xl hover:shadow-blue-300/40",
          on: "bg-gradient-to-br from-blue-900 via-blue-950/80 to-blue-950 border-blue-800 shadow-lg shadow-blue-900/40 hover:shadow-xl hover:shadow-blue-900/60",
        },
      },
    },
  );

  function handleClick() {
    if (disable) return;
    onChange?.();
  }

  /** @param {KeyboardEvent} e */
  function handleKeydown(e) {
    if (disable) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onChange?.();
    }
  }
</script>

<button
  type="button"
  aria-pressed={checked}
  aria-disabled={disable}
  tabindex={disable ? -1 : 0}
  class={cx(
    "p-0 m-0 border-0 bg-transparent rounded-lg leading-none",
    disable ? "pointer-events-none" : "cursor-pointer",
    className,
  )}
  onclick={handleClick}
  onkeydown={handleKeydown}
>
  <Block
    size="xl"
    className={cx(floorVariants({ state: checked ? "on" : "off" }), {
      "opacity-50": isTranslucen,
    })}
  >
    <div
      class={cx(
        "absolute inset-0 rounded-lg",
        checked
          ? "bg-gradient-to-b from-white/10 to-transparent"
          : "bg-gradient-to-t from-white/20 to-transparent",
      )}
    ></div>
    <span
      class={cx(
        "relative font-bold tracking-wider",
        checked ? "text-blue-200" : "text-blue-900",
      )}
    >
      {@render children?.()}
    </span>
  </Block>
</button>
