const { Schema } = require('mongoose');

const mongoose =  require('./db');

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },  
    role: { type: String, required: true },
    email: { type: String, required: true, unique: true },
}, {
        collection: 'user', versionKey: false
});

const User = mongoose.model('User', UserSchema);

module.exports = User;