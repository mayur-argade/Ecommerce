const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        maxLength: [40, 'Name should be under 40 characters'],
    },

    email: {
        type: String,
        required: [true, 'Please provide an email'],
        validate: [validator.isEmail, 'Please enter email in the correct format'],
        unique: true,
    },

    password: {
        type: String,
        required: [true, 'Please provide password'],
    },

    phone: {
        type: String,
        // required: [true, 'Please provide an mobile number'],
        validate: [validator.isMobilePhone, 'Please enter valid phone number'],
        unique: true,
    },

    address: {
        line1: {
            type: String,
            // required: [true, 'Please provide area']
        },
        city: {
            type: String,
            // required: [true, 'Please provide city']
        },
        state: {
            type: String,
            // required: [true, 'Please provide state']
        },
        postalcode: {
            type: String,
            // required: [true, 'Please provide pincode']
        },
        landmark: {
            type: String,
        },
        country: {
            type: String,
            // required: [true, 'Please provide country']
        }
    },

    lastLogin: {
        type: Date,
    },
    
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
});

module.exports = mongoose.model('User', userSchema);
