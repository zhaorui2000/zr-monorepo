<script>
  import { onMount, onDestroy } from "svelte";
  import { isWakeLock } from "../store";
  import Swap from "@zr/ui/Swap";
  import Badge from "@zr/ui/Badge";
  import Card from "@zr/ui/Card";

  let wakeLock = null;

  async function acquireWakeLock() {
    // 防护 1：阻止 SSR 报错
    if (typeof window === "undefined") {
      console.log("[WakeLock] 阻击 SSR 执行");
      return false;
    }

    // 检查浏览器是否支持
    if (!("wakeLock" in navigator)) {
      console.warn("[WakeLock] 当前浏览器不支持 Wake Lock API");
      return false;
    }

    // 检查是否已经持有（防止重复请求）
    if (wakeLock && !wakeLock.released) {
      console.log("[WakeLock] 已持有锁，跳过重复请求");
      return true;
    }

    try {
      console.log("[WakeLock] 正在向系统请求屏幕常亮...");
      wakeLock = await navigator.wakeLock.request("screen");
      console.log("[WakeLock] ✅ 请求成功，屏幕将保持常亮");
      return true;
    } catch (e) {
      // 常见原因：没有在用户交互（如点击）中触发，或者系统电量过低拒绝
      console.error("[WakeLock] ❌ 请求失败:", e.name, e.message);
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
      acquireWakeLock();
    }
  }

  // $effect 天生跳过 SSR，安全
  $effect(() => {
    if ($isWakeLock) {
      acquireWakeLock();
    } else {
      releaseWakeLock();
    }
  });

  // onMount 天生跳过 SSR，安全
  onMount(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
  });

  // ⚠️ onDestroy 会在 SSR 执行，必须加 typeof 防护！
  onDestroy(() => {
    if (typeof document !== "undefined") {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    }
    releaseWakeLock(); // 内部已经有 typeof window 判断，安全
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
