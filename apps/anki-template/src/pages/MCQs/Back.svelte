<script>
  import { cva, cx } from "class-variance-authority";
  import Card from "@zr/ui/Card";
  import Radio from "@zr/ui/Radio";
  import Alert from "@zr/ui/Alert";
  import { v4 as uuid } from "uuid";
  import {
    answer,
    randomOrder,
    OPTION_LABELS,
    ANKI_QUESTION,
    ANKI_TRUE_ANSWER,
    ANKI_OPTIONS,
  } from "./store";
  import Badge from "@zr/ui/Badge";
  import Extension from "@modules/Extension.svelte";
  import RandomOrderCheckbox from "./component/RandomOrderCheckbox.svelte";
  import CopyQuestion from "./component/CopyQuestion.svelte";
  const radioName = uuid();
  const isCorrect = $state($answer === ANKI_TRUE_ANSWER);
  const orderClass = cva("", {
    variants: {
      order: {
        1: "order-1",
        2: "order-2",
        3: "order-3",
        4: "order-4",
      },
    },
  });
  function calcBg(row) {
    if (OPTION_LABELS[row] === ANKI_TRUE_ANSWER) return "success";
    if (OPTION_LABELS[row] === $answer) {
      return "error";
    }

    return "";
  }
</script>

<div
  class="flex flex-col gap-y-2 sm:p-2 md:p-4 p-1 overflow-y-scroll overflow-x-hidden max-h-full"
>
  <Card
    responsive
    color="primary"
    title="单选题"
    stickyAble
    stickyClass="sm:-top-2 md:-top-4 -top-1 ">{@html ANKI_QUESTION}</Card
  >
  <Alert
    type={isCorrect ? "success" : "error"}
    soft
    color={isCorrect ? "success" : "error"}>{isCorrect ? "正确" : "错误"}</Alert
  >
  <Card responsive>
    <div class="grid pointer-events-none">
      {#each { length: OPTION_LABELS.length }, row}
        <Radio
          className={orderClass({ order: $randomOrder[row] })}
          bg={calcBg(row)}
          size="sm"
          value={OPTION_LABELS[row]}
          name={radioName}
        >
          <Badge className="mr-2" color="primary" size="sm"
            >{OPTION_LABELS[row]}</Badge
          >{@html ANKI_OPTIONS[row]}</Radio
        >
      {/each}
    </div>
    {#snippet actions()}
      <RandomOrderCheckbox></RandomOrderCheckbox>
      <CopyQuestion></CopyQuestion>
    {/snippet}
  </Card>
  <Extension />
</div>
