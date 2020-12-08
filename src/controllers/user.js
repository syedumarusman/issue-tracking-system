const UserHandler = require('../handlers/user');
const { USER_ROLES } = require('../utils/constants');

const getAll = async (ctx) => {
    const queryPayload = {
        exclude: ctx.query.exclude
    }
    const response = await UserHandler.getAll(queryPayload);
    ctx.body = {
        meta: {
            status: 200
        },
        data: response
    };
}

const getUser = async (ctx) => {
    const userId = ctx.params.userId;
    const response = await UserHandler.getUser(userId);
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
    const { token, userDetails } = await UserHandler.loginUser(payload)
    ctx.body = {
        meta: {
            status: 200,
            token: token
        },
        result: userDetails
    }
}

const create = async (ctx) => {
    const payload = {
        name: ctx.request.body.name,
        password: ctx.request.body.password,
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
        userId: ctx.params.userId,
        name: ctx.request.body.name,
        password: ctx.request.body.password,
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

const resetPassword = async (ctx) => {
    const payload = {
        email: ctx.request.body.email
    }
    const response = await UserHandler.resetPassword(payload);
    ctx.body = {
        meta: {
            status: 200
        },
        data: response
    };
}

const remove = async (ctx) => {
    const userId = ctx.params.userId;
    const response = await UserHandler.remove(userId);
    ctx.body = {
        meta: {
            status: 200
        },
        data: response
    };
}

module.exports = { getAll, getUser, loginUser, create, resetPassword, update, remove }