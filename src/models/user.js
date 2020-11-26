const { Schema } = require('mongoose');

const mongoose =  require('./db');

const UserSchema = new Schema({
    name: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, required: true },
    email: { type: String, required: true },
}, {
        collection: 'user', versionKey: false
});

const User = mongoose.model('User', UserSchema);

module.exports = User;