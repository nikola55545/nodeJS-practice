const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please provide a user_id"],
        ref: 'User',
    },
    username: {
        type: String,
        required: [true, "Please provide a username"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 6
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
    {
        timestamps: true
    });

    module.exports = mongoose.model('User', userSchema);