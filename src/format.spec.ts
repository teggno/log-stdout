import format from "./format";

test("Builds format 'level: message'", () => {
  const formatted = format("the level", "message");
  expect(formatted.message).toEqual("the level: message");
});

test("Stringifies rest array values", () => {
  const formatted = format("the level", "message", ["abc", 5, "c"]);
  expect(formatted.optionalParams).toEqual(["abc", "5", "c"]);
});

test("Contains the error's message in case the message argument was an Error object", () => {
  const errorMessage = "This is the error message",
    formatted = format("the level", new Error(errorMessage));
  expect(formatted.message).toContain(errorMessage);
});

test("Contains the error's message in case the rest argument contains an error object", () => {
  const errorMessage = "This is the error message",
    formatted = format("the level", "", [new Error(errorMessage)]);
  expect((formatted.optionalParams as string[])[0]).toContain(errorMessage);
});

test("Contains the error's message in case the rest argument contains an error object also if a string message was passed", () => {
  const errorMessage = "This is the error message",
    formatted = format("the level", "Prefix message", [
      new Error(errorMessage)
    ]);
  expect((formatted.optionalParams as string[])[0]).toContain(errorMessage);
});

test("Doesn't crash with nulls in rest", () => {
  format("the level", "message", ["bla", null, null, 14]);
});
