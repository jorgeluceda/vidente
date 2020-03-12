const mongoose = require('mongoose');

const labelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },

    createdOn: {
        type: Date,
        'default': Date.now
    }
    
});

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    labels: [labelSchema],
    createdOn: {
        type: Date,
        'default': Date.now
    }
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    favorite: {
        type: String,
        required: true,
    },
    groups: [groupSchema]
})

const usersSchema = new mongoose.Schema({
    users: [userSchema]
})

mongoose.model('Users', userSchema);