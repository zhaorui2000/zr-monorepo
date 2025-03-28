<script>
  import Card from "@zr/ui/Card";
  import { marked } from "marked";
  import markedRender from "@utils/markedRender";
  const extension = "{{补充}}"
    .replaceAll(/<br\s*(\/?)>/g, "\n")
    .replaceAll(/&nbsp;/g, " ");
  marked.use({ renderer: markedRender });
</script>

<Card color="warning" title="补充">
  {@html marked(extension)}
</Card>
