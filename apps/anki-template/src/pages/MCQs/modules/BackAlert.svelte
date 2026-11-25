<script>
  import Alert from "@zr/ui/Alert";
  import formatTime from "@zr/utils/Time/FormatTime.js";
  import { duration, answer, ANKI_TRUE_ANSWER } from "../store";
  const isCorrect = $derived($answer === ANKI_TRUE_ANSWER);
</script>

<Alert
  className="sticky bottom-0 z-sticky"
  responsive
  type={isCorrect ? "success" : "error"}
  soft
  color={isCorrect ? "success" : "error"}
>
  【{isCorrect ? "正确" : "错误"}】用时：({formatTime("mm:ss", $duration)})
</Alert>
