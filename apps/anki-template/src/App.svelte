<script>
  import Index from "./pages/Main/Index.svelte";
  import { onMount } from "svelte";
  import { themeChange } from "theme-change";
  onMount(() => {
    themeChange(false);
    document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
      if (link.getAttribute("href").includes(".css")) {
        link.remove();
      }
    });
    // 如果是生产环境，删除 head 中的 style 标签
    if (import.meta.env.PROD) {
      document.querySelectorAll("head style").forEach((style) => {
        style.remove();
      });
    }
  });
</script>

<Index></Index>
