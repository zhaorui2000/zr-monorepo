<script>
  import Container from "@zr/ui/Container";
  import List from "@zr/ui/List";
  import ScoreItems from "./modules/scoreItems.svelte";
  import Badge from "@zr/ui/Badge";

  let totalScore = $derived(scoreArr.reduce((pre, cur) => pre + cur, 0));
  const ScoreList = {
    animal: [
      {
        name: "牛🐂",
        max: 6,
        compScore: (value) => {
          if (value === 0) return -1;
          return Math.floor((value + 2) / 2);
        },
      },
      {
        name: "猪🐷",
        max: 7,
        compScore: (value) => {
          if (value === 0) return -1;
          return Math.floor((value + 1) / 2);
        },
      },
      {
        name: "羊🐑",
        max: 8,
        compScore: (value) => {
          if (value === 0) return -1;
          if (value === 1) return 1;
          return Math.floor(value / 2);
        },
      },
      // {
      //   name: "马🐴",
      //   max: 8,
      //   compScore: (value) => {
      //     return value;
      //   },
      // },
    ],
    board: [
      {
        name: "农田",
        max: 5,
        compScore: (value) => {
          if (value <= 1) return -1;
          return value - 1;
        },
      },
      {
        name: "牧场",
        max: 4,
        compScore: (value) => {
          if (value === 0) return -1;
          return value;
        },
      },
    ],
    grain: [
      {
        name: "谷物",
        max: 8,
        compScore: (value) => {
          if (value === 0) return -1;
          if (value === 1) return 1;
          return Math.floor(value / 2);
        },
      },
      {
        name: "蔬菜",
        max: 4,
        compScore: (value) => {
          if (value === 0) return -1;
          return value;
        },
      },
    ],
    other: [
      {
        name: "未使用格子",
        max: 9,
        compScore: (value) => {
          return -value;
        },
      },
      {
        name: "畜棚",
        max: 9,
        compScore: (value) => {
          return value;
        },
      },
      {
        name: "砖屋",
        max: 9,
        compScore: (value) => {
          return value;
        },
      },
      {
        name: "石屋",
        max: 9,
        compScore: (value) => {
          return value * 2;
        },
      },
      {
        name: "人口",
        max: 9,
        compScore: (value) => {
          return value * 3;
        },
      },
      {
        name: "乞讨标志",
        max: 9,
        compScore: (value) => {
          return value * -3;
        },
      },
    ],
  };
  let scoreArr = $state([
    ...new Array(ScoreList.board.length).fill(-1),
    ...new Array(ScoreList.animal.length).fill(-1),
    ...new Array(ScoreList.grain.length).fill(-1),
    ...new Array(ScoreList.other.length).fill(0),
  ]);
</script>

<Container className="relative">
  <List>
    {#snippet title()}
      动物
    {/snippet}
    {#each ScoreList.animal as { compScore, max, name }, index}
      <ScoreItems
        onChangeScore={(score) => (scoreArr[index] = score)}
        {compScore}
        {max}>{name}</ScoreItems
      >
    {/each}
  </List>
  <List>
    {#snippet title()}
      板块
    {/snippet}
    {#each ScoreList.board as { compScore, max, name }, index}
      <ScoreItems
        onChangeScore={(score) =>
          (scoreArr[index + ScoreList.animal.length] = score)}
        {compScore}
        {max}>{name}</ScoreItems
      >
    {/each}
  </List>
  <List>
    {#snippet title()}
      粮食
    {/snippet}
    {#each ScoreList.grain as { compScore, max, name }, index}
      <ScoreItems
        onChangeScore={(score) =>
          (scoreArr[index + ScoreList.animal.length + ScoreList.board.length] =
            score)}
        {compScore}
        {max}>{name}</ScoreItems
      >
    {/each}
  </List>
  <List>
    {#snippet title()}
      其他
    {/snippet}
    {#each ScoreList.other as { compScore, max, name }, index}
      <ScoreItems
        onChangeScore={(score) =>
          (scoreArr[
            index +
              ScoreList.animal.length +
              ScoreList.board.length +
              ScoreList.grain.length
          ] = score)}
        {compScore}
        {max}>{name}</ScoreItems
      >
    {/each}
  </List>
  <div class="sticky bottom-0 flex justify-end">
    <Badge size="xl">总分：{totalScore}</Badge>
  </div>
</Container>
