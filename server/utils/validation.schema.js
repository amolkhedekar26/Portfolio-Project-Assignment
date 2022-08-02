const Joi = require("joi");

const schemaRegister = Joi.object().keys({
  email: Joi.string().email().lowercase().required().messages({
    "string.empty": "Email cannot be empty",
    "string.email": "Email is invalid",
    "any.required": "Email is required",
  }),
  password: Joi.string()
    .min(8)
    .max(30)
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
    )
    .required()
    .messages({
      "string.empty": "Password cannot be empty",
      "string.min": "Password must be at least 8 characters long",
      "string.max": "Password must be at most 30 characters long",
      "any.required": "Password is required",
      "string.pattern.base":
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
    }),
});

const schemaLogin = Joi.object().keys({
  email: Joi.string().email().lowercase().required().messages({
    "string.empty": "Email cannot be empty",
    "string.email": "Email is invalid",
    "any.required": "Email is required",
  }),
  password: Joi.string().min(8).max(30).required().messages({
    "string.empty": "Password cannot be empty",
    "string.min": "Password must be at least 8 characters long",
    "string.max": "Password must be at most 30 characters long",
    "any.required": "Password is required",
  }),
});

const schemaForgot = Joi.object().keys({
  email: Joi.string().email().lowercase().required(),
});

const schemaReset = Joi.object().keys({
  password: Joi.string().min(8).max(30).required().messages({
    "string.empty": "Password cannot be empty",
    "string.min": "Password must be at least 8 characters long",
    "string.max": "Password must be at most 30 characters long",
    "any.required": "Password is required",
  }),
});

const schemaProfile = Joi.object().keys({
  userId: Joi.string().required().messages({
    "any.required": "User ID is required",
    "string.empty": "User ID is required",
  }),
  firstName: Joi.string().required().messages({
    "any.required": "First name is required",
    "string.empty": "First name cannot be empty",
  }),
  lastName: Joi.string().required().messages({
    "any.required": "Last name is required",
    "string.empty": "Last name cannot be empty",
  }),
  location: Joi.string().required().messages({
    "any.required": "Location is required",
    "string.empty": "Location cannot be empty",
  }),
  contactNo: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({
      "string.pattern.base": `Contact number must have 10 digits`,
      "any.required": "Contact number is required",
      "string.empty": "Contact number cannot be empty",
    })
    .required(),
  aboutMe: Joi.string().required().messages({
    "any.required": "About me is required",
    "string.empty": "About me cannot be empty",
  }),
});

module.exports = {
  schemaRegister: schemaRegister,
  schemaLogin: schemaLogin,
  schemaForgot: schemaForgot,
  schemaReset: schemaReset,
  schemaProfile: schemaProfile,
};
