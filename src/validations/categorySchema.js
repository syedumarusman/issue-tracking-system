const Joi = require('joi');

const createSchema = Joi.object({
    name: Joi.string().required()
})

const getOneSchema = Joi.object({
    _id: Joi.string().required()
})

const updateSchema = Joi.object({
    _id: Joi.string().required(),
    name: Joi.string().required()
})

const removeSchema = Joi.object({
    _id: Joi.string().required()
})

module.exports = { getOneSchema, createSchema, updateSchema, removeSchema };