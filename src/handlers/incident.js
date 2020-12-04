const Boom = require('boom');
const Incident = require('../models/incident');
const { createSchema } = require('../validations/incidentSchema');

const getAll = async () => {
    return await Incident.find();
}

const create = async (payload) => {
    payload.caseHistory.append(`${payload.title} Incident created at ${payload.dateCreated}`)
    const { error } = createSchema.validate(payload, { allowUnknown: true });
    if (error) {
        throw error;
    }
    const incident = await Incident.findOne({title: payload.title});
    if (!incident) {
        throw Boom.badRequest('incident already exist');
    }
    await Incident.create(payload);
    return incident;
}

module.exports = { getAll, create }