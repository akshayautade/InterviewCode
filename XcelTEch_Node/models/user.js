const mongoose = require('mongoose');

const User = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    file: {
        type: String,
    },
    active: Boolean
})

module.exports = mongoose.model("user", User);