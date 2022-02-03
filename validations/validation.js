const Joi = require("joi");

module.exports = {
  validateSignup: function (obj) {
    const schema = Joi.object({
      fullName: Joi.string()
        .min(2)
        .max(50)
        .required()
        .label("Full name")
        .messages({
          'string.min': `{#label} Name must be between 2 - 50 char`,
          'string.max': `{#label} Name must be between 2 - 50 char`,
          'any.required': `Required fields cannot be empty`
        }),
      email: Joi.string()
        .email()
        .max(50)
        .required()
        .messages({
          'string.max': `Please enter a valid email address`,
          'any.required': `Required fields cannot be empty`
        }),
      password: Joi.string()
        .regex(/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z]).*$/)
        .required()
        .messages({
          "string.pattern.base": "Password length must be atleast 8 char and must include an upper case and lower case char",
          'any.required': `Required fields cannot be empty`
        }),
    });
    return schema.validate(obj, { allowUnknown: true });
  },
  validateLogin: function (obj) {
    const schema = Joi.object({
      email: Joi.string()
        .email()
        .max(50)
        .required()
        .messages({
          'string.max': `Please enter a valid email address`,
          'any.required': `Required fields cannot be empty`
        }),
      password: Joi.string()
        .regex(/^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z]).*$/)
        .required()
        .messages({
          "string.pattern.base": "Password length must be atleast 8 char and must include an upper case and lower case char",
          'any.required': `Required fields cannot be empty`
        }),
      platform: Joi.string()
        .required()
        .messages({
          'any.required': `Required fields cannot be empty`
        }),
    });
    return schema.validate(obj, { allowUnknown: true });
  },
  validateAddCategory: function (obj) {
    const schema = Joi.object({
      name: Joi.string()
        .max(50)
        .required()
        .messages({
          'any.required': `Required fields cannot be empty`
        }),
      parentCategory: Joi.string()
        .required()
        .messages({
          'any.required': `Required fields cannot be empty`
        }).allow(null)
    });
    return schema.validate(obj, { allowUnknown: true });
  },
  validateAddProduct: function (obj) {
    const schema = Joi.object({
      name: Joi.string()
        .max(50)
        .required()
        .messages({
          'any.required': `Required fields cannot be empty`
        }),
      categoryId: Joi.string()
        .required()
        .messages({
          'any.required': `Required fields cannot be empty`
        }),
      description: Joi.string()
        .required()
        .messages({
          'any.required': `Required fields cannot be empty`
        }),
      price: Joi.number()
        .required()
        .messages({
          'any.required': `Required fields cannot be empty`
        })
    });
    return schema.validate(obj, { allowUnknown: true });
  },
}