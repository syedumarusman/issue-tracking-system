const CategoryHandler = require('../handlers/category');

const getAll = async (ctx) => {
    const response = await CategoryHandler.getAll();
    ctx.body = {
        meta: {
            status: 200
        },
        data: response
    };
}

const getOne = async (ctx) => {
    const payload = { _id: ctx.params.categoryId };
    const response = await CategoryHandler.getOne(payload);
    ctx.body = {
        meta: {
            status: 200
        },
        data: response
    }
}

const create = async (ctx) => {
    const payload = {
        name: ctx.request.body.name
    }
    const response = await CategoryHandler.create(payload);
    ctx.body = {
        meta: {
            status: 200
        },
        data: response
    };
}

const update = async (ctx) => {
    const payload = {
        _id: ctx.params.categoryId,
        name: ctx.request.body.name
    }
    const response = await CategoryHandler.update(payload);
    ctx.body = {
        meta: {
            status: 200
        },
        data: response
    };
}

const remove = async (ctx) => {
    const payload = { _id: ctx.params.categoryId };
    const response = await CategoryHandler.remove(payload);
    ctx.body = {
        meta: {
            status: 200
        },
        data: response
    };
}

module.exports = { getAll, getOne, create, update, remove }