<script>
  import { onMount } from "svelte";
  import { isWakeLock } from "../store";
  import Swap from "@zr/ui/Swap";
  import Badge from "@zr/ui/Badge";
  import Card from "@zr/ui/Card";

  let wakeLock = null;

  async function requestWakeLock() {
    if (!("wakeLock" in navigator)) return false;
    if (wakeLock && !wakeLock.released) return true;
    try {
      wakeLock = await navigator.wakeLock.request("screen");
      return true;
    } catch {
      return false;
    }
  }

  function releaseWakeLock() {
    if (wakeLock && !wakeLock.released) {
      wakeLock.release();
      wakeLock = null;
    }
  }

  function handleVisibilityChange() {
    if (document.visibilityState === "visible" && $isWakeLock) {
      requestWakeLock();
    }
  }

  onMount(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    const unsub = isWakeLock.listen((on) => {
      on ? requestWakeLock() : releaseWakeLock();
    });
    return () => {
      unsub();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      releaseWakeLock();
    };
  });
</script>

<Card>
  {#snippet children()}
    <Swap bind:checked={$isWakeLock}>
      {#snippet on()}
        <Badge size="lg" color="primary">保持唤醒</Badge>
      {/snippet}
      {#snippet off()}
        <Badge size="lg" color="error">取消唤醒</Badge>
      {/snippet}
    </Swap>
  {/snippet}
</Card>
