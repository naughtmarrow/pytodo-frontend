export class AuthorizationError extends Error {
  name: string; // should probably use a custom type for extra safety
  message: string;
  cause?: any;

  constructor(name: string, message: string, cause?: any) {
    super();
    this.name = name;
    this.message = message;
    this.cause = cause;
  }
}
