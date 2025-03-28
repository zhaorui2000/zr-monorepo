<script>
  import Card from "@zr/ui/Card";
  import { marked } from "marked";
  const extension = "{{补充}}"
    .replaceAll(/<br\s*(\/?)>/g, "\n")
    .replaceAll(/&nbsp;/g, " ");
  console.log(extension);
  console.log(marked.parse(extension));
</script>

<Card color="warning" title="补充">
  {@html marked.parse(extension)}
</Card>
