const { Schema } = require('mongoose');

const mongoose =  require('./db');

const CategorySchema = new Schema({
    name: { type: String, required: true, unique: true }
}, {
    collection: 'category', versionKey: false
});

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;