<script>
  import { cva, cx } from "class-variance-authority";
  let { thead, tbody, size, zebra, pinRows, pinCols } = $props();
  const tableVariants = cva("table", {
    variants: {
      size: {
        xs: "table-xs",
        sm: "table-sm",
        md: "table-md",
        lg: "table-lg",
        xl: "table-xl",
      },
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

<table class={cx(tableVariants({size,zebra,pinRows,pinCols}))}>
  <!-- head -->
  <thead>
    {@render thead?.()}
  </thead>
  <!-- body -->
  <tbody>
    {@render tbody?.()}
  </tbody>
</table>
