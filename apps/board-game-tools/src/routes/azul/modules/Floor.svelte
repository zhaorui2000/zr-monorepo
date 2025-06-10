<script>
  import Swap from "@zr/ui/Swap";
  import { cx } from "class-variance-authority";
  const { onChange, className, isTranslucen, disable = false } = $props();
  import Block from "@zr/ui/Block";
</script>

<Swap
  {onChange}
  className={cx({
    "pointer-events-none": disable,
  })}
>
  {#snippet off()}
    <Block
      size="xl"
      className={cx(
        `relative rounded-lg
      bg-gradient-to-br from-blue-50 via-blue-200/50 to-blue-100
      border border-blue-200 shadow-lg shadow-blue-200/50
      flex items-center justify-center
      transition-all duration-500 ease-in-out
      hover:scale-105 hover:shadow-xl hover:shadow-blue-300/40
      active:scale-95`,
        {
          "opacity-50": isTranslucen,
        },
        className
      )}
    >
      <div
        class="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent rounded-lg"
      ></div>
      <span class="relative text-blue-900 font-bold tracking-wider"></span>
    </Block>
  {/snippet}

  {#snippet on()}
    <Block
      size="xl"
      className={cx(
        `relative rounded-lg
      bg-gradient-to-br from-blue-900 via-blue-950/80 to-blue-950
      border border-blue-800 shadow-lg shadow-blue-900/40
      flex items-center justify-center
      transition-all duration-500 ease-in-out
      hover:scale-105 hover:shadow-xl hover:shadow-blue-900/60
      active:scale-95`,
        {
          "opacity-50": isTranslucen,
        },
        className
      )}
    >
      <div
        class={cx(
          "absolute inset-0 bg-gradient-to-b from-white/10 to-transparent rounded-lg"
        )}
      ></div>
      <span class="relative text-blue-200 font-bold tracking-wider"></span>
    </Block>
  {/snippet}
</Swap>
