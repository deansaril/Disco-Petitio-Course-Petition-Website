
// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `users`
var PetitionSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    coursecode: {
        type: String,
        required: true
    },
    coursetype: {
        type: String,
        required: true
    },
    day1: {
        type: String,
        required: true
    },
    day2: {
        type: String,
        required: false
    },
    starttime: {
        type: String,
        required: true
    },
    endtime: {
        type: String,
        required: true
    },
    numstudents: {
        type: Number,
        required: true
    },
    signed: {
        type: Number,
        required: true
    },
    progress: {
        type: Number,
        required: true
    },
    statusicon: {
        type: String,
        required: true
    },
    petitionid: {
        type: Number,
        required: true
    },
    datecreated: {
        type: String,
        required: true
    }
});

/*
    exports a mongoose.model object based on `UserSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `users` -> plural of the argument `User`
*/
module.exports = mongoose.model('Petition', PetitionSchema);
