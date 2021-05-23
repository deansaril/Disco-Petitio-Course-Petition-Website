
// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `users`
var SigneeSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    first: {
        type: String,
        required: true
    },
    last: {
        type: String,
        required: true
    },
    idnum: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    petitionid: {
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
module.exports = mongoose.model('Signee', SigneeSchema);
