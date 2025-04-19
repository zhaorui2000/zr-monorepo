import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);
export default function formatTime(formatStr, ...args) {
  return dayjs.duration(...args).format(formatStr);
}
