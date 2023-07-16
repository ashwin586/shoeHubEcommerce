const mongoose = require('mongoose');
const usersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    },
    isBlocked: {
        type: Boolean,
        required: true
    }
})

const User = mongoose.model('users', usersSchema);
module.exports = User;