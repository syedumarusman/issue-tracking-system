const Boom = require('boom');
const Incident = require('../models/incident');
const { createSchema } = require('../validations/incidentSchema');

const getAll = async () => {
    return await Incident.find();
}

const create = async (payload) => {
    const { error } = createSchema.validate(payload, { allowUnknown: true });
    if (error) {
        throw error;
    }
    const incident = await Incident.create(payload).catch((err) => console.log(err));
    if (!incident) {
        throw Boom.badRequest('incident already exist');
    }
    return incident;
}

module.exports = { getAll, create }