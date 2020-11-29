const UserHandler = require('../handlers/user');
const { USER_ROLES } = require('../utils/constants');

const getAll = async (ctx) => {
    const response = await UserHandler.getAll();
    ctx.body = {
        meta: {
            status: 200
        },
        data: response
    };
}

const getUser = async (ctx) => {
    const username = ctx.params.username;
    const response = await UserHandler.getUser(username)
    ctx.body = {
        meta: {
            status: 200
        },
        data: response
    }
}

const loginUser = async (ctx) => {
    const payload = {
        email: ctx.request.body.email,
        password: ctx.request.body.password,
    }
    const token = await UserHandler.loginUser(payload)
    ctx.body = {
        meta: {
            status: 200
        },
        token: token
    }
}

const create = async (ctx) => {
    const payload = {
        username: ctx.request.body.username,
        password: ctx.request.body.password,
        name: ctx.request.body.name,
        role: ctx.request.body.role? ctx.request.body.role: USER_ROLES.customer,
        email: ctx.request.body.email,
    }
    const response = await UserHandler.create(payload);
    ctx.body = {
        meta: {
            status: 200
        },
        data: response
    };
}

const update = async (ctx) => {
    const payload = {
        username: ctx.params.username,
        password: ctx.request.body.password,
        name: ctx.request.body.name,
        role: ctx.request.body.role,
        email: ctx.request.body.email,
    }
    const response = await UserHandler.update(payload);
    ctx.body = {
        meta: {
            status: 200
        },
        data: response
    };
}

const remove = async (ctx) => {
    const username = ctx.params.username;
    const response = await UserHandler.remove(username);
    ctx.body = {
        meta: {
            status: 200
        },
        data: response
    };
}

module.exports = { getAll, getUser, loginUser, create, update, remove }