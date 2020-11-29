const Joi = require('joi');
const { USER_ROLES: { admin, customer, employee } } = require('../utils/constants');

const createSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required().min(4),
    name: Joi.string().required(),
    role: Joi.string().valid(admin, customer, employee).required(),
    email: Joi.string().email().required()
});

const getUserSchema = Joi.object({
  username: Joi.string().required()
})

const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(4).required()  
})

const updateSchema = Joi.object({
    username: Joi.string(),
    password: Joi.string().min(4),  
    name: Joi.string(),
    role: Joi.string().valid(admin, customer, employee),
    email: Joi.string().email()
})

const removeSchema = Joi.object({
  username: Joi.string().required()  
})

module.exports = { getUserSchema, loginUserSchema, createSchema, updateSchema, removeSchema }