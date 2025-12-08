import { body, param } from "express-validator";

const nameRule = body("name")
  .trim()
  .notEmpty()
  .withMessage("Name is required")
  .isLength({ min: 2, max: 50 })
  .withMessage("Name must be between 2 and 50 characters")
  .custom((value) => {
    if (/[^a-zA-Z\s'-]/.test(value)) {
      throw new Error("Name can only contain letters, spaces, apostrophes, and hyphens");
    }
    return true;
  });

const emailRule = body("email")
  .trim()
  .notEmpty()
  .withMessage("Email is required")
  .isEmail()
  .withMessage("Email must be valid")
  .normalizeEmail();

const atLeastOneFieldRule = body()
  .custom((_, { req }) => {
    const { name, email } = req.body;
    if (!name && !email) {
      throw new Error("Provide at least one field to update");
    }
    return true;
  });

const idRule = param("id")
  .isInt({ min: 1 })
  .withMessage("id must be a positive integer")
  .toInt();

export const createUserValidation = [nameRule, emailRule];

export const replaceUserValidation = [idRule, nameRule, emailRule];

export const updateUserValidation = [idRule, atLeastOneFieldRule, nameRule.optional(), emailRule.optional()];

export const getUserValidation = [idRule];
