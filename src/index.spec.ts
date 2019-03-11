import createLogger from "./index";

const expectedLogLevels = ["error", "warn", "info", "debug"];

test(`returns a logger a method for each log level ${expectedLogLevels.join(
  ", "
)}`, () => {
  const logger = createLogger("info");
  expectedLogLevels.forEach(l => {
    expect(logger).toHaveProperty(l);
    expect(typeof (logger as any)[l]).toEqual("function");
  });
});
