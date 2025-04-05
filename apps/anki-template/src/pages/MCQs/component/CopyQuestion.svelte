<script>
  import Button from "@zr/ui/Button";
  import copy from "@zr/utils/DOM/copy";
  import { ANKI_QUESTION, ANKI_OPTIONS, OPTION_LABELS } from "../store";
  let loading = $state(false);
  const handleClick = async () => {
    let domparser = new DOMParser();
    loading = true;
    await copy(
      `${domparser.parseFromString(ANKI_QUESTION, "text/html").documentElement.textContent}\n\n${ANKI_OPTIONS.map((option, index) => `${OPTION_LABELS[index]}. ${domparser.parseFromString(option, "text/html").documentElement.textContent}`).join("\n")}`
    );
    setTimeout(() => {
      loading = false;
    }, 300);
  };
</script>

<Button color="secondary" responsive onclick={handleClick} {loading}
  >复制题目</Button
>
