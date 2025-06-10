<script>
  const { on, off, onChange, className } = $props();
  import { cx } from "class-variance-authority";
</script>

<label class={cx("swap", className)}>
  <input type="checkbox" onchange={onChange} />
  <div class="swap-on">{@render on?.()}</div>
  <div class="swap-off">{@render off?.()}</div>
</label>
