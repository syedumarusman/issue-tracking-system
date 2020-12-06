const Boom = require('boom');
const Incident = require('../models/incident');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { createSchema, getAllSchema } = require('../validations/incidentSchema');

const getAll = async (queryPayload) => {
    const { error } = getAllSchema.validate(queryPayload, { allowUnknown: true });
    if(error) {
        throw error;
    }
    Object.keys(queryPayload).forEach(key => queryPayload[key] === undefined ? delete queryPayload[key] : {});
    let token = jwt.verify(ctx.request.header.token, JWT_SECRET_KEY);
    if (typeof token === "string") {
        throw new Error('Not a valid token');
    }
    if(token.role == 'customer') {
        const user = await User.findOne({ _id: token._id }).populate('incidents');
        return user.incidents;
    }
    return await Incident.find(queryPayload);
}

const create = async (payload) => {
    payload.caseHistory.push(`${payload.title} Incident created at ${payload.dateCreated}`);
    const { error } = createSchema.validate(payload, { allowUnknown: true });
    if (error) {
        throw error;
    }
    const incident = await Incident.findOne({title: payload.title});
    if (incident) {
        throw Boom.badRequest('incident already exist');
    }
    const newIncident = await Incident.create(payload);
    let token = jwt.verify(ctx.request.header.token, JWT_SECRET_KEY);
    if(typeof token !== 'string'){
        await User.findByIdAndUpdate(
            { _id: token._id },
            { $push: { incidents: token._id } },
            { new: true });
    }
    return newIncident;
}

module.exports = { getAll, create }