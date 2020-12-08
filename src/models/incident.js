const { Schema } = require('mongoose');

const mongoose = require('./db');

const IncidentSchema = new Schema({
    title: { type: String, required: true, unique: true },
    category: { type: String, required: true },    
    description: { type: String, required: true },
    dateCreated: { type: String, required: true },
    dateResolved: { type: String, default: '' },
    state: { type: String, required: true },
    pointOfContact: { type: String, required: true },
    tags: { type: [String] },
    currentAssignee: { type: String, default: '' },
    caseHistory: { type: [String], required: true }
}, {
        collection: 'incident', versionKey: false
    });

const Incident = mongoose.model('Incident', IncidentSchema);

module.exports = Incident