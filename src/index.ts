import format, { Message } from "./format";

const levels: Level[] = ["silent", "error", "warn", "info", "debug"];

export default function createLogger(
  level: Level,
  formatterFactory: FormatterFactory = level => (message, rest) =>
    format(level, message, rest)
) {
  const configuredLevelIndex = levels.indexOf(level);
  if (configuredLevelIndex === -1) {
    throw new Error(
      `Invalid log level "${level}". Allowed levels: ${levels.join(", ")}`
    );
  }

  return levels.reduce((logger, l, i) => {
    const formatter = formatterFactory(l);
    if (l !== "silent") {
      logger[l] =
        i <= configuredLevelIndex
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
    }

    return logger;
  }, {} as Logger);
}

export type CallableLevel = "error" | "warn" | "info" | "debug";
export type Level = "silent" | CallableLevel;

export interface LogData {
  level: Level;
  message: Message;
  rest: any[];
}

interface LogFn {
  (message: Message, ...rest: any[]): void;
}

type Logger = { [x in CallableLevel]: LogFn };

const noOp: LogFn = () => {};

interface FormatterFactory {
  (level: string): (message: any, rest: any[]) => ConsoleParams;
}

interface ConsoleParams {
  message: any;
  optionalParams?: any[];
}
