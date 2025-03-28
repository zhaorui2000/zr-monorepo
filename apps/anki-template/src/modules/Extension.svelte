<script>
  import Card from "@zr/ui/Card";
  import { marked } from "marked";
  import markedRender from "@utils/markedRender.svelte.js";
  import Collapse from "@zr/ui/Collapse";
  const extension = "{{补充}}"
    .replaceAll(/<br\s*(\/?)>/g, "\n")
    .replaceAll(/&nbsp;/g, " ");
  const extensionCollapsible = "{{折叠内容}}"
    .replaceAll(/<br\s*(\/?)>/g, "\n")
    .replaceAll(/&nbsp;/g, " ");
  const hasExtensionCollapsible = "{{#折叠内容}}1{{/折叠内容}}";
  marked.use({ renderer: markedRender });
</script>

<Card color="warning" title="补充">
  {#if Number(hasExtensionCollapsible) === 1}
    <Collapse color="neutral" icon="plus" title="折叠内容">
      {@html marked(extensionCollapsible)}
    </Collapse>
  {/if}
  {@html marked(extension)}
</Card>
