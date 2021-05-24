
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

const Petition = require('../models/PetitionModel.js');
const Signee = require('../models/SigneeModel.js');
const Notification = require('../models/NotificationModel.js');
const Comment = require('../models/CommentModel.js');

/*
    defines an object which contains functions executed as callback
    when a client requests for `index` paths in the server
*/
const controller = {

    /*
        executed when the client sends an HTTP GET request `/favicon.ico`
        as defined in `../routes/routes.js`
    */
    getFavicon: function (req, res) {
        res.status(204);
    },

    /*
        executed when the client sends an HTTP GET request `/`
        as defined in `../routes/routes.js`
    */
    getIndex: function (req, res) {
        if(req.session.username) {

            res.redirect('/home/' + req.session.username);
        }
        else {

            //Deletes Petitions that are at least 1 week old
            var today = new Date();
            var formattedDate = today.getFullYear().toString() + '-' + (today.getMonth() + 1).toString().padStart(2, 0) + '-' + today.getDate().toString().padStart(2, 0);
            var Difference_In_Time =  0;
            var Difference_In_Days = 0;

            db.findMany(Petition, null, null, function(petitionResult){

                var i;
                for(i = 0 ; i < petitionResult.length; i++){

                    var petitionDate = new Date(petitionResult[i].datecreated);

                    Difference_In_Time =  today.getTime() - petitionDate.getTime();
                    Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                    if(Difference_In_Days >= 7){
                        console.log(petitionResult[i].coursecode + "'s " + "petitionDate: " + petitionDate + " has reached 1 week: " + Difference_In_Days);
                        
                        var petitionid = petitionResult[i].petitionid;

                        db.findOne(Petition, {petitionid: petitionid}, null, function (result) {
                            db.findMany(Signee, {petitionid: petitionid}, null, function(signees){

                                var i;
                                var signeeNotif = {};
                                var inserted = true;

                                for(i = 0; i < signees.length && inserted; i++){

                                    //if current signee is not the owner of petition, insert a notification 
                                    if(signees[i].username != result.username){


                                        signeeNotif.username = signees[i].username;
                                        signeeNotif.petitionusername = result.username;
                                        signeeNotif.petitionid = result.petitionid;
                                        signeeNotif.coursecode = result.coursecode;
                                        signeeNotif.type = "signed";
                                        signeeNotif.statusicon = "fa fa-ban";
                                        signeeNotif.date = formattedDate;

                                        db.insertOne(Notification, signeeNotif, function(notifResult){
                                            inserted = notifResult;
                                        })
                                    }
                                }
                            });

                             db.deleteOne(Petition, {petitionid: petitionid}, function (delPetition){
                                db.deleteMany(Signee, {petitionid: petitionid}, function (delSignee){
                                    db.deleteMany(Comment, {petitionid: petitionid}, function(delComment){
                                    });
                                });
                             });
                        });
                    }
                    else{
                        console.log(petitionResult[i].coursecode + "'s " + "petitionDate: " + petitionDate + " has not reached 1 week: " + Difference_In_Days);
                    }
                }
                
            });

            res.redirect('/login');

        }
    }
}

/*
    exports the object `controller` (defined above)
    when another script exports from this file
*/
module.exports = controller;
