
// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `users`
var NotificationSchema = new mongoose.Schema({

    //username the notification is for
    username: {
        type: String,
        required: true
    },

    //username of the owner of the ptition
    petitionusername: {
        type: String,
        required: true
    },

    //first and last are attributes for comment notifications
    first: {
        type: String,
        required: false
    },

    last: {
        type: String,
        required: false
    },

    petitionid: {
        type: String,
        required: true
    },

    coursecode:{
        type: String,
        required: true
    },

    type:{
        type: String,
        required: true
    },

    statusicon:{
        type: String,
        required: true
    },

    date:{
        type: String,
        required:true
    }
});

/*
    exports a mongoose.model object based on `UserSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `users` -> plural of the argument `User`
*/
module.exports = mongoose.model('Notification', NotificationSchema);
