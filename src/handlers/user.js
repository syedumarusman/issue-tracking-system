const Boom = require('boom');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../utils/constants');
const { createSchema, getUserSchema, updateSchema, removeSchema, loginUserSchema } = require('../validations/userSchema');

const getAll = async () => {
    return await User.find();
}

const getUser = async (username) => {
    const { error } = getUserSchema.validate({ username })
    if (error) {
        throw error;
    }
    const user = await User.findOne({ username });
    if (!user) {
        throw Boom.notFound('User does not exist');
    }
    return user;
}

const loginUser = async (payload) => {
    const { error } = loginUserSchema.validate(payload)
    if (error) {
        throw error;
    }
    const user = await User.findOne({ email: payload.email })
    if (!user) {
        throw Boom.badRequest('Invalid email or password');
    }
    const token = jwt.sign(user.toJSON(), JWT_SECRET_KEY, { expiresIn: '12h' })
    return token;
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
    response = user.username + " succesfully removed." 
    return response;
}

module.exports = { getAll, getUser, loginUser, create, update, remove }