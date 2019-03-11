import { inspect } from "util";

const newlineReplacement = "\\n",
  newline = /\n/g;

export default function format({
  level,
  message,
  rest
}: {
  level: string;
  message: Message;
  rest?: any[];
}) {
  return `${level}: ${stringify(message)}${
    rest && rest.length ? " " + rest.map(stringify).join(" ") : ""
  }`.replace(newline, newlineReplacement);
}

function stringify(value: any) {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean")
    return value.toString();

  return inspect(value);
}

export type Message = string | Error | number | boolean;
