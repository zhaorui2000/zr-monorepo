<script>
  import { cva } from "class-variance-authority";
  import Card from "@zr/ui/Card";
  import Radio from "@zr/ui/Radio";
  import { v4 as uuid } from "uuid";
  import {
    answer,
    randomOrder,
    OPTION_LABELS,
    ANKI_QUESTION,
    ANKI_OPTIONS,
  } from "./store";
  import generateUniqueRandomNumbers from "@zr/utils/Array/generateUniqueRandomNumbers";

  const radioName = uuid();
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
</script>

<div class="flex flex-col gap-y-2 p-4">
  <Card color="primary" title="单选题">{@html ANKI_QUESTION}</Card>
  <div class="grid">
    <Card>
      <div class="grid">
        {#each { length: OPTION_LABELS.length }, row}
          <Radio
            color="primary"
            className={orderClass({ order: $randomOrder[row] })}
            size="sm"
            onchange={() => ($answer = OPTION_LABELS[row])}
            value={OPTION_LABELS[row]}
            name={radioName}>{@html ANKI_OPTIONS[row]}</Radio
          >
        {/each}
      </div>
    </Card>
  </div>
</div>
