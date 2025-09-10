<script>
  import Alert from "@zr/ui/Alert";
  import formatTime from "@zr/utils/Time/FormatTime.js";
  import { duration, answer, ANKI_TRUE_ANSWER } from "../store";
  const isCorrect = $state($answer === ANKI_TRUE_ANSWER);
</script>

<Alert
  className="sticky bottom-0 z-[999]"
  duration={3000}
  responsive
  type={isCorrect ? "success" : "error"}
  soft
  color={isCorrect ? "success" : "error"}
  >【{isCorrect ? "正确" : "错误"}】用时：({formatTime(
    "mm:ss",
    $duration,
  )})</Alert
>
