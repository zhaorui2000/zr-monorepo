import dayjs from "dayjs";

export default function isToday(date) {
  return dayjs().isSame(date, "day");
}
