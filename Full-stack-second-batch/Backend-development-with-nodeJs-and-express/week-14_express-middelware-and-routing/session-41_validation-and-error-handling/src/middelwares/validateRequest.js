import { validationResult } from "express-validator";
import { ValidationError } from "../errors/ApiError.js";

const validateRequest = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const formatted = errors.array({onlyFirstError: true}).map((error)=> ({
			field: error.path,
			message: error.msg,
			value: error.value
		}))

		return next(new ValidationError(formatted))
	}

};

export default validateRequest;
