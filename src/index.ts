import format, { Message } from "./format";

const levels: Level[] = ["error", "warn", "info", "debug"];

export default function createLogger(level: Level) {
  const index = levels.indexOf(level);
  if (index === -1) {
    throw new Error(
      `Invalid log level "${level}". Allowed levels: ${levels.join(", ")}`
    );
  }

  return levels.reduce(
    (logger, l, i) => {
      logger[l] =
        i <= index
          ? (message: Message, ...rest: any) =>
              log({ level: l, message: message, rest: rest })
          : noOp;
      return logger;
    },
    {} as Logger
  );
}

function log(logData: LogData) {
  const line = format(logData);
  console.log(line);
}

export type Level = "error" | "warn" | "info" | "debug";

export interface LogData {
  level: Level;
  message: Message;
  rest: any[];
}

interface LogFn {
  (message: Message, ...rest: any[]): void;
}

type Logger = { [x in Level]: LogFn };

const noOp: LogFn = () => {};
