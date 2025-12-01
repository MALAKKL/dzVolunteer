const Joi = require('joi');

const signupSchema = Joi.object({
  firstName: Joi.string().min(1).max(100).required(),
  lastName: Joi.string().min(1).max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().allow('', null),
  bio: Joi.string().allow('', null),
  city: Joi.string().allow('', null),
  country: Joi.string().allow('', null)
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const updateProfileSchema = Joi.object({
  firstName: Joi.string().min(1).max(100),
  lastName: Joi.string().min(1).max(100),
  phone: Joi.string().allow('', null),
  bio: Joi.string().allow('', null),
  city: Joi.string().allow('', null),
  country: Joi.string().allow('', null)
}).min(1);




module.exports = { signupSchema, loginSchema, updateProfileSchema };
