# log-stdout

A JavaScript logging module for Node.js that logs by calling `console.log()`.
Intended to be used together with other tools (e.g. docker) that grab lines
written to stdout and add their own stuff such as timestamps.

## Installation

npm install log-stdout

## Usage

Create a log object when your application starts:

```js
// logger.js
const createLogger = require("log-stdout");

const logger = createLogger(process.env.LOG_LEVEL || "debug");

module.exports = logger;
```

Use the logger:

```js
// index.js
const logger = require("./logger");

// Log some string using the "info" log level
logger.info("Some string");
// Output:
// info: Some string

// Log a couple of strings and numbers using the "error" log level
logger.error("Some string", 7, "also a string", 8);
// Output:
// error: Some string 7 also a string 8

// Log an error using the "error" log level
logger.error(new Error("An error happened"));
// Output:
// error: An error happened<stack trace>

// Log some string and an error using the "debug" log level
logger.debug("Some string", new Error("An error happened"));
// Output:
// debug: Some string Error: An error happened<stack trace>

// Log some string, an error and more stuff using the "warn" log level
logger.warn("Some string", new Error("An error happened"), "more", {
  stuff: "stuff"
});
// Output:
// warn: Some string Error: An error happened<stack trace> more { stuff: 'stuff'}
```

## Valid log levels

You can pass one of the following log levels to the function that is returned by
`require("log-stdout")` (which is `createLogger()` in the above example):

- silent
- error
- warn
- info
- debug

The return value of the function returned by `require("log-stdout")` is an
object that has a method for each log level except "silent". Each of these
methods has the same name as the corresponding log level. Calling any of these
methods will either result in log output or not depending on the log level the
logger was created with.

## Log output

The output of any of the log methods (e.g. `logger.debug("some message")`)
is a string that has only a single line. Inside that string, line breaks
are written as `\n`.
