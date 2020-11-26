const Joi = require('joi');

const userCreateSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email()
});

module.exports = { userCreateSchema }