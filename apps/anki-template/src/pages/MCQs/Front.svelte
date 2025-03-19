<script>
  import { cva } from "class-variance-authority";
  import Card from "@zr/ui/Card";
  import Radio from "@zr/ui/Radio";
  import { v4 as uuid } from "uuid";
  import { answer, randomOrder } from "./store";
  import generateUniqueRandomNumbers from "@zr/utils/Array/generateUniqueRandomNumbers";
  const question = "{{问题}}";
  const AOption = "{{A}}";
  const BOption = "{{B}}";
  const COption = "{{C}}";
  const DOption = "{{D}}";
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
  <Card color="primary" title="单选题">{@html question}</Card>
  <Card>
    <div class="grid">
      <Radio
        className={orderClass({ order: $randomOrder[0] })}
        color="primary"
        size="sm"
        value="A"
        onchange={() => ($answer = "A")}
        name={radioName}>{@html AOption}</Radio
      >
      <Radio
        className={orderClass({ order: $randomOrder[1] })}
        color="primary"
        size="sm"
        value="B"
        onchange={() => ($answer = "B")}
        name={radioName}>{@html BOption}</Radio
      >
      <Radio
        className={orderClass({ order: $randomOrder[2] })}
        color="primary"
        size="sm"
        value="C"
        onchange={() => ($answer = "C")}
        name={radioName}>{@html COption}</Radio
      >
      <Radio
        className={orderClass({ order: $randomOrder[3] })}
        color="primary"
        size="sm"
        value="D"
        onchange={() => ($answer = "D")}
        name={radioName}>{@html DOption}</Radio
      >
    </div></Card
  >
</div>
