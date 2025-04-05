<script>
  import { cva } from "class-variance-authority";
  import Card from "@zr/ui/Card";
  import Radio from "@zr/ui/Radio";
  import CopyQuestion from "./component/CopyQuestion.svelte";
  import Container from "@zr/ui/Container";
  import { v4 as uuid } from "uuid";
  import {
    answer,
    randomOrder,
    OPTION_LABELS,
    ANKI_QUESTION,
    ANKI_OPTIONS,
  } from "./store";
  import generateUniqueRandomNumbers from "@zr/utils/Array/generateUniqueRandomNumbers";
  import { onMount } from "svelte";
  const radioName = uuid();
  let dialog;
  $randomOrder = generateUniqueRandomNumbers(1, 4);
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
  onMount(() => {
    // ······· 初始化 ·······
    $answer = "";
    // ------- 初始化 -------
  });
</script>

<Container
  className="grid gap-y-2"
  style="grid-template-rows: 1fr min-content;"
>
  <Card
    responsive
    className="overflow-y-scroll min-h-[6.25rem]"
    color="primary"
    title="单选题">{@html ANKI_QUESTION}</Card
  >
  <div class="grid">
    <Card responsive>
      <div class="grid">
        {#each { length: OPTION_LABELS.length }, row}
          <Radio
            color="primary"
            className={orderClass({ order: $randomOrder[row] })}
            responsive
            checked={$answer === OPTION_LABELS[row]}
            onchange={() => ($answer = OPTION_LABELS[row])}
            value={OPTION_LABELS[row]}
            name={radioName}>{@html ANKI_OPTIONS[row]}</Radio
          >
        {/each}
      </div>
      {#snippet collapsedActions()}
        <CopyQuestion></CopyQuestion>
      {/snippet}
    </Card>
  </div>
</Container>
