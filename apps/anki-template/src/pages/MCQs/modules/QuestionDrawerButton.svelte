<script>
  import {
    ANKI_QUESTION,
    OPTION_LABELS,
    ANKI_TRUE_ANSWER,
    MCQ_OPTIONS,
    randomOrder,
    answer,
  } from "../store/index.js";
  import Button from "@zr/ui/Button";
  import CopyQuestion from "../component/CopyQuestion.svelte";
  import Card from "@zr/ui/Card";
  import Badge from "@zr/ui/Badge";
  import RandomOrderCheckbox from "../component/RandomOrderCheckbox.svelte";
  import Radio from "@zr/ui/Radio";
  import Drawer from "@zr/ui/Drawer";

  const radioName = $props.id();
  const orderClasses = ["", "order-1", "order-2", "order-3", "order-4"];

  /** @param {number} row */
  function calcBg(row) {
    if (OPTION_LABELS[row] === ANKI_TRUE_ANSWER) return "success";
    if (OPTION_LABELS[row] === $answer) {
      return "error";
    }
    return "";
  }
</script>

<Drawer btnProps={{ color: "primary", circle: true }}>
  {#snippet children({ onclick })}
    <Button color="primary" className="right-1 top-1 fixed" circle {onclick}>
      题目
    </Button>
  {/snippet}
  {#snippet sidebar()}
    <div class="flex flex-col h-full">
      <Card
        style="max-height: 40%; overflow: auto"
        responsive
        color="primary"
        title="单选题"
      >
        {@html ANKI_QUESTION}
      </Card>
      <Card className="shrink-0 max-h-[60%]" responsive>
        <div class="grid pointer-events-none">
          {#each { length: OPTION_LABELS.length }, row}
            <Radio
              className={orderClasses[$randomOrder[row]]}
              bg={calcBg(row)}
              responsive
              checked={$answer === OPTION_LABELS[row]}
              value={OPTION_LABELS[row]}
              name={radioName}
            >
              <div class="flex">
                <Badge responsive className="mr-2" color="primary">
                  {OPTION_LABELS[row]}
                </Badge>
                <span class="whitespace-pre-wrap">{MCQ_OPTIONS[row]}</span>
              </div>
            </Radio>
          {/each}
        </div>
        {#snippet actions()}
          <RandomOrderCheckbox></RandomOrderCheckbox>
        {/snippet}
        {#snippet collapsedActions()}
          <CopyQuestion></CopyQuestion>
        {/snippet}
      </Card>
    </div>
  {/snippet}
</Drawer>
