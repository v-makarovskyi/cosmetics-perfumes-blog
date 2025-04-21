
class AuthError extends Error {
  constructor(statusCode='', message) {
    super(message);
    this.statusCode = statusCode;
    this.name = "AuthError";

    if ("captureStackTrace" in Error) {
      Error.captureStackTrace(this, AuthError);
    }
  }
}

module.exports = AuthError;
