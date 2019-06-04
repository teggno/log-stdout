import format, { Message } from "./format";

const levels: Level[] = ["error", "warn", "info", "debug"];

export default function createLogger(
  level: Level,
  formatterFactory: FormatterFactory = level => (message, rest) =>
    format(level, message, rest)
) {
  const index = levels.indexOf(level);
  if (index === -1) {
    throw new Error(
      `Invalid log level "${level}". Allowed levels: ${levels.join(", ")}`
    );
  }

  return levels.reduce(
    (logger, l, i) => {
      const formatter = formatterFactory(l);
      logger[l] =
        i <= index
          ? (message, ...rest) => {
              const dt = formatter(message, rest);
              console.log.apply(
                console,
                dt.optionalParams
                  ? [dt.message, ...dt.optionalParams]
                  : [dt.message]
              );
            }
          : noOp;
      return logger;
    },
    {} as Logger
  );
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

interface FormatterFactory {
  (level: string): (message: any, rest: any[]) => ConsoleParams;
}

interface ConsoleParams {
  message: any;
  optionalParams?: any[];
}
