<script>
  import TEMp from "./pages/MCQs/Back.svelte";
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

<TEMp />
