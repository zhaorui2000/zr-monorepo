<script>
  import TEMp from "./pages/MCQs/Back.svelte";
  import ThemeController from "@zr/ui/ThemeController";
  import { onMount } from "svelte";
  onMount(() => {
    // Remove Anki default import webview.css
    document.querySelectorAll('link[rel="stylesheet"]').forEach((link) => {
      if (link.getAttribute("href").includes("webview.css")) {
        link.remove();
      }
      if (link.getAttribute("href").includes("reviewer.css")) {
        link.remove();
      }
    });
    document.querySelectorAll("head style").forEach((style) => {
      style.remove();
    });
  });
</script>

<div class="h-full w-full relative">
  <div class="absolute top-1 right-10">
    <ThemeController />
  </div>
  <TEMp />
</div>
