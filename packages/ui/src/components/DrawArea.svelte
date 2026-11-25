<script>
  import { onMount } from "svelte";
  import { Leafer, PointerEvent, Line, Group } from "leafer-ui";
  import Button from "./Button.svelte";
  import Icon from "./Icon.svelte";
  import preventDefault from "@zr/svelte-actions/preventDefault";
  import "@leafer-in/find";
  import ExpandCollapseButton from "./ExpandCollapseButton.svelte";
  import { cn } from "./common/cn.js";

  const {
    children,
    className = "",
    enabled = $bindable(true),
    ...restProps
  } = $props();

  let drawCanvasWrap;
  let line;
  let lineIds = [];
  let lineGroup;
  let leafer;

  let isDrawMode = $state(false);

  export function undo() {
    if (!lineGroup || lineIds.length === 0) return;
    lineGroup.remove(lineIds.at(-1));
    lineIds.pop();
  }

  export function clear() {
    if (!lineGroup) return;
    lineGroup.clear();
    lineIds = [];
  }

  function syncCanvas() {
    if (!leafer?.view) return;

    leafer.view.style.display = isDrawMode ? "block" : "none";
    leafer.view.style.pointerEvents = enabled ? "auto" : "none";
    drawCanvasWrap?.classList.toggle("user-select-none", enabled && isDrawMode);
  }

  onMount(() => {
    leafer = new Leafer({
      view: drawCanvasWrap,
      pointer: {
        touch: true,
      },
    });

    lineGroup = new Group();
    leafer.add(lineGroup);

    leafer.on(PointerEvent.DOWN, ({ x, y }) => {
      const styles = getComputedStyle(document.documentElement);
      const stroke =
        styles.getPropertyValue("--color-secondary").trim() ||
        styles.getPropertyValue("--color-primary").trim();

      line = new Line({
        points: [x, y],
        strokeWidth: 2,
        stroke,
      });
      lineIds.push(line.innerId);
      lineGroup.add(line);
    });

    leafer.on(PointerEvent.UP, () => {
      line = undefined;
    });

    leafer.on(PointerEvent.MOVE, ({ x, y }) => {
      if (!line) return;
      line.points = [...line.points, x, y];
    });

    syncCanvas();

    return () => {
      leafer?.destroy();
      leafer = undefined;
      lineGroup = undefined;
      line = undefined;
    };
  });

  $effect(syncCanvas);
</script>

<div class={cn("relative grid", className)} {...restProps}>
  <div
    use:preventDefault={{
      eventName: "touchmove",
      beforePrevent: () => isDrawMode,
    }}
    bind:this={drawCanvasWrap}
  >
    {@render children?.()}
  </div>
  <div class="flex justify-end items-center sticky bottom-0 h-0 z-sticky">
    <ExpandCollapseButton
      toggleIconClass="icon-[material-symbols--draw-outline-rounded]"
      bind:show={isDrawMode}
      className="-translate-y-[50%]"
    >
      {#snippet buttons()}
        <Button
          responsive
          circle
          color="error"
          aria-label="清空绘制"
          onclick={clear}
        >
          <Icon iconClass="icon-[material-symbols--delete-outline-rounded]" />
        </Button>
        <Button responsive circle aria-label="撤销绘制" onclick={undo}>
          <Icon iconClass="icon-[material-symbols--undo-rounded]" />
        </Button>
      {/snippet}
    </ExpandCollapseButton>
  </div>
</div>
