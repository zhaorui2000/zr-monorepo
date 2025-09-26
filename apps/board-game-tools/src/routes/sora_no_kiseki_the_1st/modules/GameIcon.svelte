<script>
  import icons from "../assets/sora1st_icons.webp";
  let { name = "" } = $props();
  const iconMap = {
    "地": "-0px -72px",
    "水": "-24px -72px",
    "火": "-48px -72px",
    "风": "-72px -72px",
    "时": "-96px -72px",
    "空": "-120px -72px",
    "幻": "-144px -72px",
    "地-magic": "-0px -48px",
    "水-magic": "-24px -48px",
    "火-magic": "-48px -48px",
    "风-magic": "-72px -48px",
    "时-magic": "-96px -48px",
    "空-magic": "-120px -48px",
    "幻-magic": "-144px -48px",
    SS: "0px -312px",
    "S+": "-24px -312px",
    S: "-48px -312px",
    "A+": "-72px -312px",
    A: "-96px -312px",
    "B+": "-120px -312px",
    B: "-144px -312px",
    "C+": "-168px -312px",
    C: "-192px -312px",
    "D+": "-216px -312px",
    D: "-240px -312px",
    "E+": "-264px -312px",
    E: "-288px -312px",
    "—": "-312px -312px",
    "敌方-单体":"0px -336px",
    "敌方-圆":"-24px -336px",
    "地点-圆":"-24px -336px",
    "敌方-直线":"-48px -336px",
    "敌方-扇形":"-72px -336px",
    "敌方-全体":"-96px -336px",
    "我方-单体":"-120px -336px",
    "我方-圆":"-144px -336px",
    "我方-全体":"-168px -336px",
  };
</script>

<span
  class="mx-1 bg-no-repeat inline-block"
  style="height: 24px;width: 24px;background-size: 512px 512px;background-image: url({icons});background-position: {iconMap[
    name
  ]};"
></span>
