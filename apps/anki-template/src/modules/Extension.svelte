<script>
  import Card from "@zr/ui/Card";
  import Collapse from "@zr/ui/Collapse";
  import marked from "@utils/marked";
  const extension = String.raw`{{补充}}`
    .replaceAll(/<br\s*(\/?)>/g, "\n")
    .replaceAll(/&nbsp;/g, " ")
    .replaceAll(/&gt;/g, ">")
    .replaceAll(/&lt;/g, "<");
  const extensionCollapsible = String.raw`{{折叠内容}}`
    .replaceAll(/<br\s*(\/?)>/g, "\n")
    .replaceAll(/&nbsp;/g, " ");
  const hasExtensionCollapsible = `{{#折叠内容}}1{{/折叠内容}}`;
</script>

<Card responsive color="warning" title="补充">
  {#if Number(hasExtensionCollapsible) === 1}
    <Collapse color="neutral" icon="plus" title="折叠内容">
      {@html marked(extensionCollapsible)}
    </Collapse>
  {/if}
  {@html marked(extension)}
</Card>
