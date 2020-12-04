const { Schema } = require('mongoose');

const mongoose = require('./db');

const IncidentSchema = new Schema({
    title: { type: String, required: true, unique: true },
    category: { type: String, required: true },    
    description: { type: String, required: true },
    dateCreated: { type: Date, required: true },
    dateResolved: { type: Date, required: true },
    state: { type: String, required: true },
    pointOfContact: { type: String, required: true },
    tags: { type: [String], required: true },
    currentAssignee: { type: String, required: true },
    caseHistory: { type: [String], required: true }
}, {
        collection: 'incident', versionKey: false
    });

const Incident = mongoose.model('Incident', IncidentSchema);

module.exports = Incident