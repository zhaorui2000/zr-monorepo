<script>
  import Navbar from "@zr/ui/Navbar";
  import "./app.css";
  import Icon from "@zr/ui/Icon";
  import Button from "@zr/ui/Button";
  import { goto } from "$app/navigation";

  function handleBack() {
    goto("/");
  }
</script>

<div class="h-full w-full grid" style="grid-template-rows: min-content 1fr;">
  <Navbar>
    {#snippet start()}
      <Button ghost circle onclick={handleBack}>
        <Icon iconClass="icon-[material-symbols--arrow-back-ios-rounded]"
        ></Icon>
      </Button>
    {/snippet}
  </Navbar>
  <slot></slot>
</div>
