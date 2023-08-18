const mongoose = require('mongoose');
const validator = require('validator');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    description: {
        type: String,
        required: true,
    },

    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
});

module.exports = mongoose.model('Category', categorySchema);