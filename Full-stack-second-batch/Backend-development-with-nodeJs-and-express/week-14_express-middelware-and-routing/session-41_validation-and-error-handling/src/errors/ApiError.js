export class ApiError extends Error	{
	constructor(status, message, details) {
		super(message);
		this.name = this.constructor.name;
		this.status = status;
		this.statusCode = status;
		this.details = details;
		Error.captureStackTrace?.(this, this.constructor)

	}
}

export class ValidationError extends ApiError{
	constructor(details) {
		super(422, 'validation failed', details)
	}
}