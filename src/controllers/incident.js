const IncidentHandler = require('../handlers/incident');

const getAll = async (ctx) => {
    filterPayload = {
        title: ctx.query.title,
        category: ctx.query.category,
        state: ctx.query.state,
        pointOfContact: ctx.query.pointOfContact,
        tags: ctx.query.tags
    }
    const token = ctx.request.header.authorization;
    const response = await IncidentHandler.getAll(filterPayload, token);
    ctx.body = {
        meta: {
            status: 200
        },
        data: response
    };
}

const create = async (ctx) => {
    const payload = {
        title: ctx.request.body.title,
        category: ctx.request.body.category,
        description: ctx.request.body.description,
        dateCreated: ctx.request.body.dateCreated,
        dateResolved: ctx.request.body.dateResolved,
        state: ctx.request.body.state,
        pointOfContact: ctx.request.body.pointOfContact,
        tags: ctx.request.body.tags,
        currentAssignee: ctx.request.body.currentAssignee,
        caseHistory: []
    }
    const token = ctx.request.header.authorization;
    const response = await IncidentHandler.create(payload, token);
    ctx.body = {
        meta: {
            status: 200
        },
        data: response
    };
}

const update = async (ctx) => {
    const payload = {
        title: ctx.request.body.title,
        category: ctx.request.body.category,
        description: ctx.request.body.description,
        dateResolved: ctx.request.body.dateResolved,
        state: ctx.request.body.state,
        pointOfContact: ctx.request.body.pointOfContact,
        tags: ctx.request.body.tags,
        currentAssignee: ctx.request.body.currentAssignee,
        caseHistory: ctx.request.body.caseHistory
    }
    const response = await IncidentHandler.update(payload);
    ctx.body = {
        meta: {
            status: 200
        },
        data: response
    };
}

const remove = async (ctx) => {
    const deletePayload = { _id: ctx.params.incidentId };
    const response = await UserHandler.remove(userId);
    ctx.body = {
        meta: {
            status: 200
        },
        data: response
    };
}

module.exports = { getAll, create, update, remove }