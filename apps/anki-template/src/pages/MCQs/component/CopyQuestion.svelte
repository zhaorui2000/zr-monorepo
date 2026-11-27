<script>
  import { onDestroy } from "svelte";
  import Button from "@zr/ui/Button";
  import { ANKI_QUESTION, OPTION_LABELS, MCQ_OPTIONS } from "../store";
  import Tooltip from "@zr/ui/Tooltip";
  import Icon from "@zr/ui/Icon";

  let loading = $state(false);
  let status = $state("");
  /** @type {number | undefined} */
  let resetTimer;

  const statusText = $derived(
    status === "success"
      ? "已复制"
      : status === "error"
        ? "复制失败，请长按题目手动复制"
        : "复制",
  );

  /** @param {string} content */
  async function copyText(content) {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(content);
        return;
      } catch {}
    }

    const textarea = document.createElement("textarea");
    textarea.value = content;
    textarea.readOnly = true;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    textarea.style.pointerEvents = "none";
    document.body.append(textarea);
    textarea.focus({ preventScroll: true });
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);

    try {
      if (!document.execCommand("copy")) {
        throw new Error("Copy command was rejected");
      }
    } finally {
      textarea.remove();
    }
  }

  const handleClick = async () => {
    if (loading) return;

    loading = true;
    status = "";
    const parser = new DOMParser();
    const question = parser.parseFromString(ANKI_QUESTION, "text/html")
      .documentElement.textContent;
    const options = MCQ_OPTIONS.map(
      (text, index) => `${OPTION_LABELS[index]}. ${text}`,
    ).join("\n");

    try {
      await copyText(`${question}\n\n${options}`);
      status = "success";
    } catch {
      status = "error";
    } finally {
      loading = false;
      clearTimeout(resetTimer);
      resetTimer = setTimeout(
        () => (status = ""),
        status === "error" ? 3000 : 1600,
      );
    }
  };

  onDestroy(() => clearTimeout(resetTimer));
</script>

<div class="flex items-center justify-end gap-2">
  {#if status}
    <span
      class="text-xs text-base-content/70"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {statusText}
    </span>
  {/if}
  <Tooltip
    position="top"
    color={status === "error" ? "error" : status ? "success" : "neutral"}
  >
    {#snippet content()}
      {statusText}
    {/snippet}
    <Button
      responsive
      color="secondary"
      circle
      onclick={handleClick}
      {loading}
      size="sm"
      aria-label={statusText}
    >
      <Icon responsive iconClass="icon-[material-symbols--content-copy]" />
    </Button>
  </Tooltip>
</div>
