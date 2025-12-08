export class ApiError extends Error {
  constructor(status, message, details) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.statusCode = status;
    this.details = details;
    Error.captureStackTrace?.(this, this.constructor);
  }
}

export class BadRequestError extends ApiError {
  constructor(message = "Bad Request", details) {
    super(400, message, details);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized", details) {
    super(401, message, details);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = "Forbidden", details) {
    super(403, message, details);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "Not Found", details) {
    super(404, message, details);
  }
}

export class ConflictError extends ApiError {
  constructor(message = "Conflict", details) {
    super(409, message, details);
  }
}

export class ValidationError extends ApiError {
  constructor(details) {
    super(422, "Validation failed", details);
  }
}
