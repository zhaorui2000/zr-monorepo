<script>
  import Checkbox from "@zr/ui/Checkbox";
  import { isRandomOrder, randomOrder } from "../store";

  /** @param {Event} event */
  const handleChangeOrder = (event) => {
    const checked = /** @type {HTMLInputElement} */ (event.currentTarget)
      .checked;
    $isRandomOrder = checked;
    if (!checked) {
      $randomOrder = [1, 2, 3, 4];
      return;
    }

    const order = [1, 2, 3, 4];
    for (let index = order.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [order[index], order[randomIndex]] = [order[randomIndex], order[index]];
    }
    $randomOrder = order;
  };
</script>

<Checkbox responsive checked={$isRandomOrder} onchange={handleChangeOrder}>
  乱序
</Checkbox>
