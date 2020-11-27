const Joi = require('joi');

const createSchema = Joi.object({
    username: Joi.string().required(),
    name: Joi.string().required(),
    isAdmin: Joi.boolean().required(),
    email: Joi.string().email().required()
});

const updateSchema = Joi.object({
    name: Joi.string(),
    isAdmin: Joi.boolean(),
    email: Joi.string().email()
})

const removeSchema = Joi.object({
  username: Joi.string().required()  
})

module.exports = { createSchema, updateSchema, removeSchema }