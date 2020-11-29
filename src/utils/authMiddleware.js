const Boom = require('boom');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('./constants');

function auth(expectedRole) {
    return async (ctx, next) => {

        let token = jwt.verify(ctx.request.header.token, JWT_SECRET_KEY);
        if (typeof token === "string") {
            throw new Error('Not a valid token');
        }

        for (const role of expectedRole) {
            if (role == token.role) {
                return next();
            }
        }
        throw Boom.unauthorized("User is not authorized");
    }
}

module.exports = auth;