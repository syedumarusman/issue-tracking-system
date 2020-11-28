const Boom = require('boom');
const UserHandler = require('../handlers/user');

const getAll = async (ctx) => {
    const result = await UserHandler.getAll();
    ctx.body = {
        meta: {
            status: 200
        },
        data: result
    };
}

const getUser = async (ctx) => {
    const username = ctx.params.username;
    const result = await UserHandler.getUser(username)
    ctx.body = {
        meta: {
            status: 200
        },
        data: result
    }
}

const create = async (ctx) => {
    const payload = {
        username: ctx.request.body.username,
        name: ctx.request.body.name,
        isAdmin: ctx.request.body.isAdmin,
        email: ctx.request.body.email,
    }
    const result = await UserHandler.create(payload);
    ctx.body = {
        meta: {
            status: 200
        },
        data: result
    };
}

const update = async (ctx) => {
    const payload = {
        username: ctx.params.username,
        name: ctx.request.body.name,
        isAdmin: ctx.request.body.isAdmin,
        email: ctx.request.body.email,
    }
    const result = await UserHandler.update(payload);
    ctx.body = {
        meta: {
            status: 200
        },
        data: result
    };
}

const remove = async (ctx) => {
    const username = ctx.params.username;
    const result = await UserHandler.remove(username);
    ctx.body = {
        meta: {
            status: 200
        },
        data: result
    };
}

module.exports = { getAll, getUser, create, update, remove }