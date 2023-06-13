import dayjs from "dayjs";

export function parseTimestamp(timestamp: string, fm = "DD-MM-YYYY HH:mm") {
  return dayjs(timestamp).format(fm);
}
