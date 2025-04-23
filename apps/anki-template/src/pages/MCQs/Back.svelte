<script>
  import { cva, cx } from "class-variance-authority";
  import Card from "@zr/ui/Card";
  import Radio from "@zr/ui/Radio";
  import Alert from "@zr/ui/Alert";
  import Container from "@zr/ui/Container";
  import { v4 as uuid } from "uuid";
  import formatTime from "@zr/utils/Time/FormatTime";
  import StickyContainer from "@zr/ui/StickyContainer";
  import {
    answer,
    duration,
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

<Container className="flex flex-col gap-y-2">
  {#snippet children({ stickyClass })}
    <StickyContainer
      className={cx("shrink-0", stickyClass({ position: "top" }))}
    >
      <Card
        responsive
        color="primary"
        title="单选题"
        stickyAble
        stickyClass="sm:-top-2 md:-top-4 -top-1">{@html ANKI_QUESTION}</Card
      >

      <Card responsive>
        <div class="grid pointer-events-none">
          {#each { length: OPTION_LABELS.length }, row}
            <Radio
              className={orderClass({ order: $randomOrder[row] })}
              bg={calcBg(row)}
              responsive
              value={OPTION_LABELS[row]}
              name={radioName}
            >
              <Badge responsive className="mr-2" color="primary"
                >{OPTION_LABELS[row]}</Badge
              >{@html ANKI_OPTIONS[row]}</Radio
            >
          {/each}
        </div>
        {#snippet actions()}
          <RandomOrderCheckbox></RandomOrderCheckbox>
        {/snippet}
        {#snippet collapsedActions()}
          <CopyQuestion></CopyQuestion>
        {/snippet}
      </Card>
    </StickyContainer>
    <Alert
      responsive
      type={isCorrect ? "success" : "error"}
      soft
      color={isCorrect ? "success" : "error"}
      >【{isCorrect ? "正确" : "错误"}】用时：({formatTime(
        "mm:ss",
        $duration
      )})</Alert
    >
    <Extension />
  {/snippet}
</Container>
