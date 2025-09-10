<script>
  import Container from "@zr/ui/Container";
  import Extension from "@modules/Extension.svelte";
  import BackAlert from "./modules/BackAlert.svelte";
  import QuestionDrawerButton from "./modules/QuestionDrawerButton.svelte";
</script>

<Container className="flex flex-col gap-y-2">
  {#snippet children()}
    <QuestionDrawerButton></QuestionDrawerButton>
    <Extension />
    <BackAlert></BackAlert>
  {/snippet}
</Container>
