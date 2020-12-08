const Boom = require('boom');
const Incident = require('../models/incident');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { STATE } = require('../utils/constants');
const { createSchema, getAllSchema, updateSchema, removeSchema } = require('../validations/incidentSchema');
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
        payload.caseHistory.push(`New Incident with Title(${payload.title}) was created at ${payload.dateCreated}`);
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

const update = async (payload) => {
    try {
        // remove undefined variables from the request payload 
        Object.keys(payload).forEach(key => payload[key] === undefined ? delete payload[key] : {});
        const { error } = updateSchema.validate(payload, { allowUnknown: true });
        if (error) {
            throw error;
        }
        // Check if incident exists in database
        const incident = await Incident.findOne({title: payload.title});
        if (incident) {
            throw Boom.badRequest('incident already exist');
        }
        // update the current incident using the request payload
        const updatedIncident = await Incident.findByIdAndUpdate( currentIncident._id , payload, { new: true });

        // update case history of that incident
        if(typeof currentIncident !== 'string') {
            const currentDateTime = new Date().toLocaleString();
            let newHistory = [];
            newHistory.concat(payload.caseHistory);
            newHistory.push(`Incident with ID(${updatedIncident._id}) and Title(${updatedIncident.title}) was updated at ${currentDateTime}`);
            // if state is updated to "done", append case history with new change
            if(payload.state === STATE.done) {
                newHistory.push(`Incident with ID(${updatedIncident._id}) and Title(${updatedIncident.title}) was updated at ${currentDateTime}`);
            }
            await Incident.findByIdAndUpdate(
                { _id: updatedIncident._id },
                { $set: { caseHistory: newHistory } },
                { new: true });
        }
        return updatedIncident;
    } catch(err) {
        console.log(err)
    }
}

const remove = async (payload) => {
    try {
        const { error } = removeSchema.validate(payload, { allowUnknown: true });
        if (error) {
            throw error;
        }
        const response = await Incident.findOneAndRemove({ _id: userId }, { useFindAndModify: false });
        if (!user) {
            throw Boom.notFound('User does not exist');
        }        
        return response;
    } catch (err) {
        console.log(err)
    }
}

module.exports = { getAll, create, update, remove }