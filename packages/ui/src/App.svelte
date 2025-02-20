<script>
  import Badge from "@zr/ui/components/Badge.svelte";
  import Button from "./components/Button.svelte";
  import Card from "./components/Card.svelte";
  import TextArea from "./components/TextArea.svelte";
</script>

<main
  class="grid overflow-y-auto gap-2 p-2 bg-base-100 w-full h-full"
  style="grid-template-rows: min-content 1fr min-content;"
>
  <div class="flex">
    <Badge color="primary"
      >{#snippet content()}
        模型名称{/snippet}</Badge
    >
  </div>
  <Card>{#snippet content()}{/snippet}</Card>
  <div class="grid w-full gap-y-2" style="grid-template-rows: 1fr min-content;">
    <TextArea />
    <div class="flex justify-end gap-2">
      <Button color="error"
        >{#snippet content()}
          清空
        {/snippet}</Button
      >
      <Button color="primary">
        {#snippet content()}
          确定
        {/snippet}
      </Button>
    </div>
  </div>
</main>
