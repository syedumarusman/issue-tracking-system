const IncidentHandler = require('../handlers/incident');

const getAll = async (ctx) => {
    const response = await IncidentHandler.getAll();
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
    const response = await IncidentHandler.create(payload);
    ctx.body = {
        meta: {
            status: 200
        },
        data: response
    };
}


module.exports = { getAll, create }