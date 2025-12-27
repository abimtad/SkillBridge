import { body } from 'express-validator';
import { validationResult } from 'express-validator';

export const validateEmail = [
  body('email').isEmail().withMessage('Must be a valid email address'),
];

export const validateLogin = [
  body('username')
    .notEmpty()
    .withMessage('Username is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
];

export const validateSignup = [
  body("name"),
  body('username')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
	validateEmail,
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/\d/)
    .withMessage('Password must contain a number')
    .matches(/[a-z]/)
    .withMessage('Password must contain a lowercase letter')
    .matches(/[A-Z]/)
    .withMessage('Password must contain an uppercase letter')
    .matches(/[^a-zA-Z\d]/)
    .withMessage('Password must contain a special character'),
];


export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }