const Boom = require('boom');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../utils/constants');
const { createSchema, getUserSchema, resetPasswordSchema, updateSchema, removeSchema, loginUserSchema } = require('../validations/userSchema');
const sendEmail = require('./email');

const getAll = async () => {
    return await User.find();
}

const getUser = async (userId) => {
    const { error } = getUserSchema.validate({ userId })
    if (error) {
        throw error;
    }
    const user = await User.findOne({ _id: userId });
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
        throw Boom.badRequest(`User with "${payload.email}" email does not exist`);
    }
    const token = jwt.sign(user.toJSON(), JWT_SECRET_KEY, { expiresIn: 3600 })
    const userDetails = {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }
    return { token, userDetails };
}

const create = async (payload) => {
    const { error } = createSchema.validate(payload, { allowUnknown: true });
    if (error) {
        throw error;
    }
    const user = await User.create(payload);
    if (!user) {
        throw Boom.badRequest('This User already exists');
    }
    return user;
}

const resetPassword = async (payload) => {
    const { error } = resetPasswordSchema.validate(payload, { allowUnknown: true });
    if (error) {
        throw error;
    }
    const newPassword = Math.random().toString(36).substring(7);
    const updatedUser = await User.findOneAndUpdate(payload, {$set: {password: newPassword} }, 
        { useFindAndModify: false, new: true });
    if (!updatedUser) {
        throw Boom.notFound('User does not exist');
    }
    await sendEmail(updatedUser)
    return updatedUser;
}

const update = async (payload) => {
    const { error } = updateSchema.validate(payload, { allowUnknown: true });
    if (error) {
        throw error;
    }
    const query = { id: payload.userId };
    const user = await User.findOne(query);
    if (!user) {
        throw Boom.notFound('User does not exist');
    }
    user = user.toObject();
    delete user._id;
    const updatedPayload = Object.assign({}, user, payload);
    const updatedUser = await User.findOneAndUpdate(query, updatedPayload, { new: true, 
        upsert: true, setDefaultsOnInsert: true, useFindAndModify: false });
    return user;
}

const remove = async (userId) => {
    const { error } = removeSchema.validate({ userId }, { allowUnknown: true });
    if (error) {
        throw error;
    }
    const user = await User.findOneAndRemove({ _id: userId }, { useFindAndModify: false });
    if (!user) {
        throw Boom.notFound('User does not exist');
    }
    response = {
        isRemoved: true,
        message: user.name + " succesfully removed."    
    } 
    return response;
}

module.exports = { getAll, getUser, loginUser, create, resetPassword, update, remove }