<script>
  import { cx, cva } from "class-variance-authority";
  let { children, className, maxWidth, ...restProps } = $props();
  const containerClassVariants = cva(
    "m-auto p-1 sm:p-2 md:p-3 lg:p-4 xl:p-5 2xl:p-6 overflow-y-scroll overflow-x-hidden max-h-full",
    {
      variants: {
        maxWidth: {
          undefined: [""],
          "3xs": "max-w-3xs",
          "2xs": "max-w-2xs",
          xs: "max-w-xs",
          sm: "max-w-sm",
          md: "max-w-md",
          lg: "max-w-lg",
          xl: "max-w-xl",
          "2xl": "max-w-2xl",
          "3xl": "max-w-3xl",
          "4xl": "max-w-4xl",
          "5xl": "max-w-5xl ",
          "6xl": "max-w-6xl",
          "7xl": "max-w-7xl",
          full: "max-w-full",
          max: "max-w-max",
          min: "max-w-min",
          prose: "max-w-prose",
          screen: "max-w-screen",
          none: "max-w-none",
        },
      },
    }
  );
  const stickyClass = cva("", {
    variants: {
      position: {
        top: ["-top-1 sm:-top-2 md:-top-3 lg:-top-4 xl:-top-5 2xl:-top-6"],
        bottom: [
          "-bottom-1 sm:-bottom-2 md:-bottom-3 lg:-bottom-4 xl:-bottom-5 2xl:-bottom-6",
        ],
      },
    },
  });
</script>

<div class={cx(containerClassVariants({ maxWidth }), className)} {...restProps}>
  {@render children?.({ stickyClass })}
</div>
