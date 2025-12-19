class AuthErrorClient extends Error {
  name: string;
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.name = "AuthErrorClient";
    this.statusCode = statusCode;
    if ("captureStackTrace" in Error) {
      Error.captureStackTrace(this, AuthErrorClient);
    }
  }
}

export { AuthErrorClient };
