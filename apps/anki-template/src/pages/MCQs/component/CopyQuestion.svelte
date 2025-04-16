<script>
  import Button from "@zr/ui/Button";
  import copy from "@zr/utils/DOM/copy";
  import { ANKI_QUESTION, ANKI_OPTIONS, OPTION_LABELS } from "../store";
  import Tooltip from "@zr/ui/Tooltip";
  import Icon from "@zr/ui/Icon";
  let loading = $state(false);
  let result = $state(false);
  const handleClick = async () => {
    let domparser = new DOMParser();
    loading = true;
    try {
      let res = await copy(
        `${domparser.parseFromString(ANKI_QUESTION, "text/html").documentElement.textContent}\n\n${ANKI_OPTIONS.map((option, index) => `${OPTION_LABELS[index]}. ${domparser.parseFromString(option, "text/html").documentElement.textContent}`).join("\n")}`
      );
      result = true;
    } catch (error) {
      result = false;
    }

    setTimeout(() => {
      loading = false;
    }, 700);
    setTimeout(() => {
      result = false;
    }, 700);
  };
</script>

<Tooltip position="top" color={result ? "success" : "neutral"}>
  {#snippet content()}
    {result ? "复制成功" : "复制"}
  {/snippet}
  <Button
    responsive
    color="secondary"
    circle
    onclick={handleClick}
    {loading}
    size="sm"
  >
    <Icon responsive iconClass="icon-[material-symbols--content-copy]" />
  </Button>
</Tooltip>
