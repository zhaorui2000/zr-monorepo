<script>
  import Container from "@zr/ui/Container";
  import List from "@zr/ui/List";
  import ScoreItems from "./modules/scoreItems.svelte";
  import Badge from "@zr/ui/Badge";
  import beforeDestroyWarn from "@zr/svelte-actions/beforeDestroyWarn";
  import { scoreList } from "./store";

  let totalScore = $derived(scoreArr.reduce((pre, cur) => pre + cur, 0));
  let scoreArr = $state([
    ...new Array($scoreList.board.length).fill(-1),
    ...new Array($scoreList.animal.length).fill(-1),
    ...new Array($scoreList.grain.length).fill(-1),
    ...new Array($scoreList.keyDev.length).fill(0),
    ...new Array($scoreList.other.length).fill(0),
  ]);
</script>

<div use:beforeDestroyWarn></div>
<Container maxWidth="5xl" className="relative w-full grid gap-y-2">
  <List>
    {#snippet title()}
      动物
    {/snippet}
    {#each $scoreList.animal as { compScore, max, name }, index}
      <ScoreItems
        onChangeScore={(score) => (scoreArr[index] = score)}
        {compScore}
        {max}><div class="pl-2">{name}</div></ScoreItems
      >
    {/each}
  </List>
  <List>
    {#snippet title()}
      板块
    {/snippet}
    {#each $scoreList.board as { compScore, max, name }, index}
      <ScoreItems
        onChangeScore={(score) =>
          (scoreArr[index + $scoreList.animal.length] = score)}
        {compScore}
        {max}><div class="pl-2">{name}</div></ScoreItems
      >
    {/each}
  </List>
  <List>
    {#snippet title()}
      粮食
    {/snippet}
    {#each $scoreList.grain as { compScore, max, name }, index}
      <ScoreItems
        onChangeScore={(score) =>
          (scoreArr[
            index + $scoreList.animal.length + $scoreList.board.length
          ] = score)}
        {compScore}
        {max}><div class="pl-2">{name}</div></ScoreItems
      >
    {/each}
  </List>
  <List>
    {#snippet title()}
      主要发展卡(资源数量)
    {/snippet}
    {#each $scoreList.keyDev as { compScore, max, name }, index}
      <ScoreItems
        onChangeScore={(score) =>
          (scoreArr[
            index +
              $scoreList.animal.length +
              $scoreList.board.length +
              $scoreList.grain.length
          ] = score)}
        {compScore}
        {max}><div class="pl-2">{name}</div></ScoreItems
      >
    {/each}
  </List>
  <List>
    {#snippet title()}
      其他
    {/snippet}
    {#each $scoreList.other as { compScore, max, name }, index}
      <ScoreItems
        onChangeScore={(score) =>
          (scoreArr[
            index +
              $scoreList.animal.length +
              $scoreList.board.length +
              $scoreList.grain.length +
              $scoreList.keyDev.length
          ] = score)}
        {compScore}
        {max}><div class="pl-2">{name}</div></ScoreItems
      >
    {/each}
  </List>
  <div class="fixed bottom-1 right-1 flex justify-end">
    <Badge size="xl">总分：{totalScore}</Badge>
  </div>
</Container>
