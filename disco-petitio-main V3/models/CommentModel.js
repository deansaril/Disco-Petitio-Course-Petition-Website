
// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `users`
var CommentSchema = new mongoose.Schema({
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
    date:{
        type: String,
        required: true
    },
    petitionid: {
        type: String,
        required: true
    },
    commentcontent: {
        type: String,
        required: true
    },
    picname: {
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
module.exports = mongoose.model('Comment', CommentSchema);
