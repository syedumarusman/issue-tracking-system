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

const create = async (ctx) => {
    const payload = {
        name: ctx.request.body.name,
        isAdmin: ctx.request.body.isAdmin,
        email: ctx.request.body.email,
    }
    console.log("payload: ", payload);
    const result = await UserHandler.create(payload);
    ctx.body = {
        meta: {
            status: 200
        },
        data: result
    };
}

module.exports = { getAll, create }