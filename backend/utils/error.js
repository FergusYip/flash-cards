class ParameterError extends Error {
  constructor(expected) {
    super("Incorrect Parameters");
    this.name = "ParameterError";
    this.status = 400;
    this.expected = expected;
  }
}

module.exports = { ParameterError };
