<script>
  let { on, off, onChange, className, checked = $bindable(false) } = $props();
  import { cx } from "class-variance-authority";
  function handleChange(e) {
    checked = !checked;
    onChange?.(e);
  }
</script>

<label class={cx("swap", className)}>
  <input type="checkbox" onchange={onChange} bind:checked />
  <div class="swap-on">{@render on?.()}</div>
  <div class="swap-off">{@render off?.()}</div>
</label>
