import format from "./format";

test("Builds format 'level: message'", () => {
  const formatted = format({ level: "the level", message: "message" });
  expect(formatted).toEqual("the level: message");
});

test("Separates primitives with spaces", () => {
  const formatted = format({
    level: "the level",
    message: "message",
    rest: ["a", 5, "c"]
  });
  expect(formatted).toContain("the level: message a 5 c");
});

test("Contains the error's message in case the message argument was an Error object", () => {
  const errorMessage = "This is the error message",
    formatted = format({
      level: "the level",
      message: new Error(errorMessage)
    });
  expect(formatted).toContain(errorMessage);
});

test("Contains the error's message in case the rest argument contains an error object", () => {
  const errorMessage = "This is the error message",
    formatted = format({
      level: "the level",
      message: "",
      rest: [new Error(errorMessage)]
    });
  expect(formatted).toContain(errorMessage);
});

test("Contains the error's message in case the rest argument contains an error object also if a string message was passed", () => {
  const errorMessage = "This is the error message",
    formatted = format({
      level: "the level",
      message: "Prefix message",
      rest: [new Error(errorMessage)]
    });
  expect(formatted).toContain(errorMessage);
});
