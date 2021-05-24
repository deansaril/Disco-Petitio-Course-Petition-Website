
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const Petition = require('../models/PetitionModel.js');

const User = require('../models/UserModel.js');

const Signee = require('../models/SigneeModel.js');

const Comment = require('../models/CommentModel.js');

const Notification = require('../models/NotificationModel.js');


/*
    defines an object which contains functions executed as callback
    when a client requests for `Register` paths in the server
*/

const notificationsController = {

    getNotifications: function(req,res){
        if(req.session.username){


            var username = req.session.username;
            db.findOne(User, {username: username}, null, function(userResult){
                db.findMany(Notification, {username: username, type: "my"}, null, function(notifs){
                    db.findMany(Notification, {username: username, type: "signed"}, null, function(signedNotifs){
                         res.render('notifications',{userResult, notifs, signedNotifs});
                    });
                })
            });


        }
        else{
            res.redirect('/login');
        }
    }
}

/*
    exports the object `controller` (defined above)
    when another script exports from this file
*/
module.exports = notificationsController;
