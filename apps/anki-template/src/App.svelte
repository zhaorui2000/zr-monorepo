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
    });
  });
</script>

<div class="h-lvh w-lvw relative">
  <div class="absolute top-1 right-10">
    <ThemeController />
  </div>
  <TEMp />
</div>
