const { Schema } = require('mongoose');

const mongoose =  require('./db');

const UserSchema = new Schema({
    name: { type: String, required: true },  
    password: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    incidents: [{ type: Schema.Types.ObjectId, ref: 'Incident' }],
}, {
        collection: 'user', versionKey: false
});

const User = mongoose.model('User', UserSchema);

module.exports = User;