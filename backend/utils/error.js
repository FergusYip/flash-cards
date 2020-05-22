class AuthenticationError extends Error {
  constructor(message) {
    super(message || "Failed to authenticate user");
    this.name = "AuthenticationError";
    this.status = 401;
  }
}

class NotFoundError extends Error {
  constructor() {
    super("404 Not Found");
    this.name = "NotFoundError";
    this.status = 404;
  }
}

class ParameterError extends Error {
  constructor(expected) {
    super("Incorrect parameters");
    this.name = "ParameterError";
    this.status = 400;
    this.expected = expected;
  }
}

module.exports = { AuthenticationError, NotFoundError, ParameterError };
