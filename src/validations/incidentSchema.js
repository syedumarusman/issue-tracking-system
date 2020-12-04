const Joi = require('Joi');

const createSchema = Joi.object({
    title: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    dateCreated: Joi.date().required(),
    dateResolved: Joi.date().required(),
    state: Joi.string().required(),
    pointOfContact: Joi.string().required(),
    tags: Joi.string().required(),
    currentAssignee: Joi.string().required(),
    caseHistory: Joi.array().items(Joi.string()).required()
});

module.exports = { createSchema }