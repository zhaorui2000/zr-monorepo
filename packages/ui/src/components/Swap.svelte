<script>
  const { on, off, onChange, className, checked = $bindable(false) } = $props();
  import { cx } from "class-variance-authority";
</script>

<label class={cx("swap", className)}>
  <input type="checkbox" onchange={onChange} {checked} />
  <div class="swap-on">{@render on?.()}</div>
  <div class="swap-off">{@render off?.()}</div>
</label>
