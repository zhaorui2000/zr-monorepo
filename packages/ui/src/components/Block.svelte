<script>
  import { cx, cva } from "class-variance-authority";
  const { size = "base", className, children } = $props();
  const blockVariants = cva("", {
    variants: {
      size: {
        sm: [
          "size-6",
          "sm:size-8",
          "md:size-10",
          "lg:size-12",
          "xl:size-14",
          "2xl:size-16",
        ],
        base: [
          "size-8",
          "sm:size-10",
          "md:size-12",
          "lg:size-14",
          "xl:size-16",
          "2xl:size-18",
        ],
        lg: [
          "size-12",
          "sm:size-14",
          "md:size-16",
          "lg:size-18",
          "xl:size-20",
          "2xl:size-22",
        ],
        xl: [
          "size-16",
          "sm:size-18",
          "md:size-20",
          "lg:size-22",
          "xl:size-24",
          "2xl:size-26",
        ],
        "2xl": [
          "size-20",
          "sm:size-22",
          "md:size-24",
          "lg:size-26",
          "xl:size-28",
          "2xl:size-30",
        ],
      },
    },
  });
</script>

<div class={cx(blockVariants({ size }), className)}>
  {@render children?.()}
</div>
