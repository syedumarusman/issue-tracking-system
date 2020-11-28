const Boom = require('boom');
const User = require('../models/user');
const { createSchema, getUserSchema, updateSchema, removeSchema } = require('../validations/userSchema')

const getAll = async () => {
    return await User.find();
}

const getUser = async (username) => {
    const { value, error } = getUserSchema.validate({ username })
    if (error) {
        throw error;
    }
    const user = await User.findOne({ username });
    if (!user) {
        throw Boom.notFound('User does not exist');
    }
    return user;
}

const create = async (payload) => {
    const { error } = createSchema.validate(payload, { allowUnknown: true });
    if (error) {
        throw error;
    }
    const user = await User.create(payload);
    if (!user) {
        throw Boom.badRequest('Username already exist');
    }
    return user;
}

const update = async (payload) => {
    const { error } = updateSchema.validate(payload, { allowUnknown: true });
    if (error) {
        throw error;
    }
    query = { username: payload.username }
    const user = await User.findOneAndUpdate(query, payload, { useFindAndModify: false, new: true });
    if (!user) {
        throw Boom.notFound('User does not exist');
    }
    return user;
}

const remove = async (username) => {
    const { error } = removeSchema.validate({ username }, { allowUnknown: true });
    if (error) {
        throw error;
    }
    const user = await User.findOneAndRemove({ username }, { useFindAndModify: false });
    if (!user) {
        throw Boom.notFound('User does not exist');
    }
    result = username + " succesfully removed." 
    return result;
}

module.exports = { getAll, getUser, create, update, remove }