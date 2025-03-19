<script>
  import { cva, cx } from "class-variance-authority";
  import Card from "@zr/ui/Card";
  import Radio from "@zr/ui/Radio";
  import { v4 as uuid } from "uuid";
  import { answer, randomOrder } from "./store";
  import Badge from "@zr/ui/Badge";
  import Extension from "@modules/Extension.svelte";
  const question = "{{问题}}";
  const Options = ["{{A}}", "{{B}}", "{{C}}", "{{D}}"];
  const trueAnswer = "{{答案}}";
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
    if (["A", "B", "C", "D"][row] === trueAnswer) return "success";
    if (["A", "B", "C", "D"][row] === $answer) {
      return "error";
    }

    return "";
  }
</script>

<div class="flex flex-col gap-y-2 p-4">
  <Card color="primary" title="单选题">{@html question}</Card>
  <Card>
    <div class="grid">
      {#each { length: 4 }, row}
        <Radio
          className={orderClass({ order: $randomOrder[row] })}
          bg={calcBg(row)}
          size="sm"
          value={["A", "B", "C", "D"][row]}
          name={radioName}
        >
          <Badge className="mr-2" color="primary" size="sm"
            >{["A", "B", "C", "D"][row]}</Badge
          >{@html Options[row]}</Radio
        >
      {/each}
    </div>
  </Card>
  <Extension />
</div>
