<script>
  import {
    ANKI_OPTIONS,
    ANKI_QUESTION,
    OPTION_LABELS,
    ANKI_TRUE_ANSWER,
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
  import { v4 as uuid } from "uuid";
  import { cva, cx } from "class-variance-authority";
  const radioName = uuid();
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

<Drawer btnProps={{ color: "primary", circle: true }}>
  {#snippet children({ onclick })}
    <Button color="primary" className="right-1 top-1 fixed" circle {onclick}
      >题目</Button
    >
  {/snippet}
  {#snippet sidebar()}
    <div class="flex flex-col h-full">
      <Card
        className="grow max-h-[40%]"
        responsive
        color="primary"
        title="单选题">{@html ANKI_QUESTION}</Card
      >

      <Card className="shrink-0 max-h-[60%]" responsive>
        <div class="grid pointer-events-none">
          {#each { length: OPTION_LABELS.length }, row}
            <Radio
              className={orderClass({ order: $randomOrder[row] })}
              bg={calcBg(row)}
              responsive
              value={OPTION_LABELS[row]}
              name={radioName}
            >
              <div class="flex">
                <Badge responsive className="mr-2" color="primary"
                  >{OPTION_LABELS[row]}</Badge
                >{@html ANKI_OPTIONS[row]}
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
