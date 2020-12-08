const Joi = require('Joi');

const getAllSchema = Joi.object({
    title: Joi.string(),
    category: Joi.string(),
    state: Joi.string(),
    pointOfContact: Joi.string(),
    tags: Joi.array().items(Joi.string())
})

const createSchema = Joi.object({
    title: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    dateCreated: Joi.date().required(),
    dateResolved: Joi.date().required(),
    state: Joi.string().required(),
    pointOfContact: Joi.string().required(),
    tags: Joi.array().items(Joi.string()),
    currentAssignee: Joi.string().required(),
    caseHistory: Joi.array().items(Joi.string()).required()
});

const updateSchema = Joi.object({
    title: Joi.string(),
    category: Joi.string(),
    description: Joi.string(),
    dateResolved: Joi.date(),
    state: Joi.string(),
    pointOfContact: Joi.string(),
    tags: Joi.array().items(Joi.string()),
    currentAssignee: Joi.string(),
    caseHistory: Joi.array().items(Joi.string()).required()
});

const removeSchema = Joi.object({
    _id: Joi.string().required()  
})

module.exports = { createSchema, getAllSchema, updateSchema, removeSchema }