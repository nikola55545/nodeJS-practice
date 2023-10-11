const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a first name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide the email address'],
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'Please provide the phone number'],
        trim: true
    },
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Contact', contactSchema);