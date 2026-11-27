<script>
  import Card from "@zr/ui/Card";
  import Radio from "@zr/ui/Radio";
  import CopyQuestion from "./component/CopyQuestion.svelte";
  import Container from "@zr/ui/Container";
  import DrawArea from "@zr/ui/DrawArea";
  import {
    answer,
    duration,
    isRandomOrder,
    randomOrder,
    OPTION_LABELS,
    ANKI_QUESTION,
    MCQ_OPTIONS,
  } from "./store";
  import { onMount } from "svelte";

  const radioName = $props.id();
  const orderClasses = ["", "order-1", "order-2", "order-3", "order-4"];
  let startedAt = 0;
  /** @type {number | undefined} */
  let durationTimer;

  function generateRandomOrder() {
    const order = [1, 2, 3, 4];
    for (let index = order.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [order[index], order[randomIndex]] = [order[randomIndex], order[index]];
    }
    return order;
  }
  onMount(() => {
    $answer = "";
    $randomOrder = isRandomOrder.get() ? generateRandomOrder() : [1, 2, 3, 4];
    $duration = 0;
    startedAt = Date.now();
    durationTimer = window.setInterval(() => {
      $duration = Date.now() - startedAt;
    }, 1000);

    return () => {
      window.clearInterval(durationTimer);
      $duration = Date.now() - startedAt;
    };
  });
</script>

<Container
  className="grid gap-y-2"
  style="grid-template-rows: 1fr min-content;"
>
  <DrawArea className="overflow-y-auto min-h-[6.75rem]">
    <Card responsive className="h-full" color="primary" title="单选题">
      {@html ANKI_QUESTION}
    </Card>
  </DrawArea>
  <div class="grid">
    <Card responsive>
      <div class="grid">
        {#each { length: OPTION_LABELS.length }, row}
          <Radio
            color="primary"
            className={orderClasses[$randomOrder[row]]}
            responsive
            checked={$answer === OPTION_LABELS[row]}
            onchange={() => ($answer = OPTION_LABELS[row])}
            value={OPTION_LABELS[row]}
            name={radioName}
          >
            <span class="whitespace-pre-wrap">{MCQ_OPTIONS[row]}</span>
          </Radio>
        {/each}
      </div>
      {#snippet collapsedActions()}
        <CopyQuestion></CopyQuestion>
      {/snippet}
    </Card>
  </div>
</Container>
