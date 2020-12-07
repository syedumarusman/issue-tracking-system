const Boom = require('boom');
const Incident = require('../models/incident');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { createSchema, getAllSchema } = require('../validations/incidentSchema');
const { JWT_SECRET_KEY } = require('../utils/constants');

const getAll = async (queryPayload, token) => {
    try{
        const { error } = getAllSchema.validate(queryPayload, { allowUnknown: true });
        if(error) {
            throw error;
        }
        Object.keys(queryPayload).forEach(key => queryPayload[key] === undefined ? delete queryPayload[key] : {});
        token = token.split(" ")[1]; 
        const currentUser = jwt.verify(token, JWT_SECRET_KEY);
        if (typeof currentUser === "string") {
            throw new Error('Not a valid token');
        }
        if(currentUser.role == 'customer') {
            const user = await User.findOne({ _id: currentUser._id }).populate('incidents');
            console.log("user: ", user)
            return user.incidents;
        }
        return await Incident.find(queryPayload);

    }
    catch(err){
        console.log(err)
    }
}

const create = async (payload, token) => {

    try {

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
        token = token.split(" ")[1]; 
        const currentUser = jwt.verify(token, JWT_SECRET_KEY);
        if(typeof currentUser !== 'string'){
            await User.findByIdAndUpdate(
                { _id: currentUser._id },
                { $push: { incidents: newIncident._id } },
                { new: true });
        }
        return newIncident;
    }
    catch(err){
        console.log(err)
    }

}

module.exports = { getAll, create }