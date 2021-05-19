
// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `users`
var UserSchema = new mongoose.Schema({
    // fName: {
    //     type: String,
    //     required: true
    // },
    // lName: {
    //     type: String,
    //     required: true
    // },
    // idNum: {
    //     type: Number,
    //     required: true
    // },
    // pw: {
    //     type: String,
    //     required: true
    // }
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
    pass: {
        type: String,
        required: true
    },
    picname: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        required: false
    }
});

/*
    exports a mongoose.model object based on `UserSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `users` -> plural of the argument `User`
*/
module.exports = mongoose.model('User', UserSchema);
