<script>
  import icons from "../assets/sora1st_icons.webp";
  import { ELEMENTS } from "../store/elements";

  let { name = "" } = $props();

  const SIZE = 24;
  const LABELS = ELEMENTS.map(({ label }) => label);
  const RANKS = [
    "SS",
    "S+",
    "S",
    "A+",
    "A",
    "B+",
    "B",
    "C+",
    "C",
    "D+",
    "D",
    "E+",
    "E",
    "—",
  ];
  const RANGES = [
    "敌方-单体",
    "敌方-圆",
    "地点-圆",
    "敌方-直线",
    "敌方-扇形",
    "敌方-全体",
    "我方-单体",
    "我方-圆",
    "我方-全体",
  ];

  // 名称 → 雪碧图 [列索引, 行纵坐标]；"-magic" 后缀表示魔法图标行
  const pos = $derived.by(() => {
    if (name.endsWith("-magic"))
      return [LABELS.indexOf(name.replace("-magic", "")), -48];
    if (LABELS.includes(name)) return [LABELS.indexOf(name), -72];
    if (RANKS.includes(name)) return [RANKS.indexOf(name), -312];
    return [RANGES.indexOf(name), -336];
  });
</script>

<span
  class="mx-1 inline-block align-middle bg-no-repeat size-6"
  style="background-image: url({icons}); background-size: 512px 512px; background-position: {-pos[0] *
    SIZE}px {pos[1]}px;"
></span>
