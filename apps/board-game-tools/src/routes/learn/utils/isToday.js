import dayjs from "dayjs";

export default function (date) {
    return dayjs().year() === dayjs(date).year() &&
        dayjs().month() === dayjs(date).month() &&
        dayjs().date() === dayjs(date).date()
}