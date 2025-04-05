<script>
  import Checkbox from "@zr/ui/Checkbox";
  import { randomOrder } from "../store";
  const handleChangeOrder = (function () {
    const oldOrder = randomOrder.get();
    return (a) => {
      if (a.target.checked) {
        $randomOrder = oldOrder;
      } else {
        $randomOrder = [1, 2, 3, 4];
      }
    };
  })();
</script>

<Checkbox responsive checked={true} onchange={handleChangeOrder}>乱序</Checkbox>
