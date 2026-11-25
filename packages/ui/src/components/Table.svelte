<script>
  import { cva } from "class-variance-authority";
  import { cn } from "./common/cn.js";
  import { colorVariants, sizeVariants } from "./common/variants.js";

  let {
    thead,
    tbody,
    size,
    zebra = false,
    pinRows,
    pinCols,
    className = "",
    ...restProps
  } = $props();

  const tableVariants = cva("table", {
    variants: {
      size: sizeVariants.table,
      zebra: {
        true: "table-zebra",
      },
      pinRows: {
        true: "table-pin-rows",
      },
      pinCols: {
        true: "table-pin-cols",
      },
    },
  });
</script>

<table
  class={cn(tableVariants({ size, zebra, pinRows, pinCols }), className)}
  {...restProps}
>
  <thead>
    {@render thead()}
  </thead>
  <tbody>
    {@render tbody({
      primaryClass: cn(colorVariants.surface.primary),
      warningClass: cn(colorVariants.surface.warning),
      baseBg: "bg-base-100",
    })}
  </tbody>
</table>
