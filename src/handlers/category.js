const Boom = require('boom');
const Category = require('../models/category');
const { createSchema, getOneSchema, updateSchema, removeSchema } = require('../validations/categorySchema');

const getAll = () => {
    return Category.find();
}

const getOne = async (payload) => {
    const { error } = getOneSchema.validate(payload);
    if(error) {
        throw error;
    }
    const category = await Category.findOne(payload);
    if (!category) {
        throw Boom.notFound("Category does not exist");
    }
    return category;
}

const create = async (payload) => {
    const { error } = createSchema.validate(payload);
    if(error) {
        throw error;
    }
    const category = await Category.findOne(payload);
    if (category) {
        throw Boom.badRequest("Category already exist");
    }
    const newCategory = await Category.create(payload);
    return newCategory;
}

const update = async (payload) => {
    const { error } = updateSchema.validate(payload);
    if(error) {
        throw error;
    }
    const updatedIncident = await Category.findOneAndUpdate({ _id: payload._id }, { name: payload.name }, 
        { new: true, useFindAndModify: false });
    return updatedIncident;
}

const remove = async (payload) => {
    const { error } = removeSchema.validate(payload);
    if(error) {
        throw error;
    }
    const response = await Category.findByIdAndRemove({ _id: payload._id });
    return response;
}

module.exports = { getAll, getOne, create, update, remove }