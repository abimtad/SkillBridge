import {body, param} from "express-validator";

const nameRule = body("name").
trim()
.notEmpty()
.withMessage("Name is required !")
.isLength({min: 2, max: 50})
.withMessage("Name must be between 2 and 50 characters")
.custom((value)=> {
	if (/[^a-zA-Z\s']/.test(value)) {
		throw new Error("Name can only contain letters, space, apostophes, and hyphen");
	}
	return true
})



export const createUserValidation = [nameRule];