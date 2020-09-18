import { padStart } from "lodash";

export function formatDate(date: string): string {
  return `${new Date(date).getFullYear()}-${padStart(
    String(new Date(date).getMonth() + 1),
    2,
    "0"
  )}-${padStart(String(new Date(date).getDate()), 2, "0")}`;
}
