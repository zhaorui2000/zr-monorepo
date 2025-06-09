<script>
  import { cx, cva } from "class-variance-authority";
  const { children, size = "base" } = $props();
  const numberBlockVariants = cva(
    cx(
      "flex items-center justify-center",
      "bg-gradient-to-br from-blue-50 to-indigo-100",
      "rounded-lg border border-gray-200 shadow-sm",
      "transition-all duration-300 ease-in-out",
      "text-base-content",
      "size-6",
      "sm:size-8",
      "md:size-10",
      "lg:size-12",
      "xl:size-14",
      "2xl:size-16"
    ),
    {
      variants: {
        size: {
          xs: "text-xs",
          sm: "text-sm",
          base: "text-base",
          lg: "text-lg",
          xl: "text-xl",
          "2xl": "text-2xl",
          "3xl": "text-3xl",
          "4xl": "text-4xl",
          "5xl": "text-5xl",
          "6xl": "text-6xl",
          "7xl": "text-7xl",
          "8xl": "text-8xl",
          "9xl": "text-9xl",
        },
      },
    }
  );
</script>

<div class={numberBlockVariants({ size })}>
  {@render children?.()}
</div>
