import createLogger, { Level } from "./index";

const expectedLogLevels = ["error", "warn", "info", "debug"];

test(`returns an object containing a method for each log level ${expectedLogLevels.join(
  ", "
)}`, () => {
  const logger = createLogger("info");
  expectedLogLevels.forEach(l => {
    expect(logger).toHaveProperty(l);
    expect(typeof (logger as any)[l]).toEqual("function");
  });
});

test(`applicabe levels call console.log()`, () => {
  expectedLogLevels.forEach((level, i) => {
    const logger: any = createLogger(level as any, l => (m, r) => ({
      message: `${l}:${m}`,
      optionalParams: r
    }));

    expectedLogLevels.forEach((expLevel, j) => {
      const shouldBeCalled = i >= j;
      const fn = logger[expLevel];
      const spy = spyButDontConsoleLog();
      try {
        fn("whatever");
        if (shouldBeCalled) {
          expect(spy).toHaveBeenCalledTimes(1);
        } else {
          expect(spy).toHaveBeenCalledTimes(0);
        }
      } finally {
        spy.mockRestore();
      }
    });
  });
});

test(`text is sent to console`, () => {
  const spy = spyButDontConsoleLog();
  try {
    const logger = createLogger("info", l => (m, r) => ({
      message: `${l}:${m}`,
      optionalParams: r
    }));
    logger.info("expected content");
    expect(spy).toHaveBeenCalledWith("info:expected content");
  } finally {
    spy.mockRestore();
  }
});

test(`level "silent" doesn't call console.log()`, () => {
  const spy = spyButDontConsoleLog();
  try {
    const logger = createLogger("silent", l => (m, r) => ({
      message: `${l}:${m}`,
      optionalParams: r
    }));
    logger.info("console.log() shouldn't be called");
    expect(spy).toHaveBeenCalledTimes(0);
  } finally {
    spy.mockRestore();
  }
});

function spyButDontConsoleLog() {
  return jest.spyOn(global.console, "log").mockImplementation(() => {});
}
