const { Schema } = require('mongoose');

const mongoose = require('./db');

const IncidentSchema = new Schema({
    title: { type: String, required: true, unique: true },
    category: { type: String, required: true },    
    description: { type: String, required: true },
    dateCreated: { type: Date, required: true },
    dateResolved: { type: Date, default: null },
    state: { type: String, required: true },
    pointOfContact: { type: String, required: true },
    tags: { type: [String] },
    currentAssignee: { type: String, required: true, default: null },
    caseHistory: { type: [String], required: true }
}, {
        collection: 'incident', versionKey: false
    });

const Incident = mongoose.model('Incident', IncidentSchema);

module.exports = Incident