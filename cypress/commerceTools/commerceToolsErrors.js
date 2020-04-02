export const BAD_USER_INPUT = 'BAD_USER_INPUT';
export class CommercetoolsError extends Error {
  constructor(err) {
    super(err.message || 'commercetools error');
    this.code = err.code;
    this.errors = err.body && err.body.errors;
    this.originalError = err;
  }
}
export class NotFoundError extends Error {
  constructor(message) {
    super(message || 'not found');
    this.code = 404;
  }
}
export class ValidationError extends Error {
  constructor(message, code, errors) {
    super(message || 'validation error');
    this.extensions = {
      code,
      errors,
    };
  }
}
export class ConcurrencyError extends Error {
  constructor(message) {
    super(message || 'concurrency error. version mismatch');
    this.code = 409;
  }
}
