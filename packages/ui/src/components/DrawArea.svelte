<script>
  import { onMount } from "svelte";
  import { cx } from "class-variance-authority";
  import { Leafer, PointerEvent, Line, Group } from "leafer-ui";
  import Button from "./Button.svelte";
  import Icon from "./Icon.svelte";
  import isTouchDevice from "@zr/utils/DOM/isTouchDevice";
  import preventDefault from "@zr/svelte-actions/preventDefault";
  import "@leafer-in/find";

  const { children, className, enabled = $bindable(true) } = $props();

  let drawCanvas;
  let drawCanvasWrap;
  let line;
  let lineIds = [];
  let lineGroup;
  export function undo() {
    if (lineIds.length === 0) return;
    lineGroup.remove(lineIds.at(-1));
    lineIds.pop();
  }
  export function clear() {
    lineGroup.clear();
    lineIds = [];
  }
  onMount(() => {
    if (!enabled) return;
    let isDrawing;
    let leafer = new Leafer({
      view: drawCanvasWrap,
      pointer: {
        touch: true,
      },
    });
    let stroke = getComputedStyle(document.documentElement).getPropertyValue(
      "--color-secondary"
    );
    lineGroup = new Group();
    leafer.add(lineGroup);
    leafer.on(PointerEvent.DOWN, ({ x, y }) => {
      line = new Line({
        points: [x, y],
        strokeWidth: 2,
        stroke,
      });
      lineIds.push(line.innerId);
      lineGroup.add(line);
      isDrawing = true;
    });
    if (!isTouchDevice()) {
      leafer.on(PointerEvent.UP, () => {
        isDrawing = false;
      });
    }
    leafer.on(PointerEvent.MOVE, ({ x, y }) => {
      if (!isDrawing) return;
      line.points = [...line.points, x, y];
    });
  });
</script>

<div
  class={cx("relative grid gap-x-1", className)}
  style="grid-template-columns: 1fr min-content"
>
  <div
    use:preventDefault={"touchmove"}
    class={cx({ "user-select-none": !enabled })}
    bind:this={drawCanvasWrap}
  >
    {@render children?.()}
  </div>
  <div class="flex flex-col gap-y-1 sticky top-0 h-fit">
    <Button responsive circle color="error" onclick={clear}>
      <Icon iconClass="icon-[material-symbols--delete-outline-rounded]"></Icon>
    </Button>
    <Button responsive circle onclick={undo}>
      <Icon iconClass="icon-[material-symbols--undo-rounded]"></Icon>
    </Button>
  </div>
</div>
