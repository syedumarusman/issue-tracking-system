const Boom = require('boom');
const User = require('../models/user');
const { userCreateSchema } = require('../validations/validationSchema')

const getAll = async () => {
    const users = await User.find();
    if (!users) {
        throw Boom.notFound('Users does not exist');
    }
    return users;
}

const create = async (payload) => {
    const { value, error } = userCreateSchema.validate(payload, {allowUnknown: true});
    if (error) {
        throw error;
    }
    const user = await User.create(payload);
    console.log("db response: ", user);
    if (!user) {
        throw Boom.notFound('error');
    }
    return user;
}

module.exports = { getAll, create }