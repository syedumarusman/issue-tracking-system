const Joi = require('joi');
const { USER_ROLES: { admin, customer, employee } } = require('../utils/constants');

const createSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required().min(4),
    role: Joi.string().valid(admin, customer, employee).required(),
    email: Joi.string().email().required()
});

const getUserSchema = Joi.object({
  userId: Joi.string().required()
})

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required()  
})

const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required()
});

const updateSchema = Joi.object({
    userId: Joi.string(),
    name: Joi.string(),
    password: Joi.string().min(4),  
    role: Joi.string().valid(admin, customer, employee),
    email: Joi.string().email()
})

const removeSchema = Joi.object({
  userId: Joi.string().required()  
})

module.exports = { getUserSchema, loginUserSchema, createSchema, resetPasswordSchema, updateSchema, removeSchema }