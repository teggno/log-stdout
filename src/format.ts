import { inspect } from "util";

const newlineReplacement = "\\n",
  newline = /\n/g;

export default function format(level: string, message: any, rest?: any[]) {
  return {
    message: `${level}: ${oneLineString(message)}`,
    optionalParams: rest ? rest.map(oneLineString) : rest
  };
}

function oneLineString(value: any) {
  return stringify(value).replace(newline, newlineReplacement);
}

function stringify(value: any) {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean")
    return value.toString();

  return inspect(value);
}

export type Message = string | Error | number | boolean;
