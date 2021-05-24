
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const Petition = require('../models/PetitionModel.js');

const User = require('../models/UserModel.js');

const Signee = require('../models/SigneeModel.js');

const Notification = require('../models/NotificationModel.js');

/*
    defines an object which contains functions executed as callback
    when a client requests for `Register` paths in the server
*/


const acceptpetitionController = {

    getAcceptpetition: function (req, res) {
        if(req.session.username) {
            var username = req.session.username;
            //res.render(`edit-prof`,username);
            //var username = req.query.param;
            //res.send(username);
            //res.render(`edit-prof`);
            db.findOne(User, {username: username}, null, function (result) {
                //res.render(`my-petition`,result);
                db.findMany(Petition, {progress: 100}, null, function (all) {
                    // res.send(result);
                    res.render(`accept-petition`,{all,result});
                });
            });
        }
        else {
            res.redirect('/login');
        }
            
    },

    getSearchtypepetition: function (req, res) {
        // res.send(`test`);
        if(req.session.username) {

            var username = req.session.username;
            var tempsearch = req.query.search;
            var search = tempsearch.toUpperCase();
            //res.send(`test ` + search + ` ` + username);
            db.findOne(User, {username: username}, null, function (result) {
                db.findMany(Petition, {progress: 100, coursetype: search, username: username}, null, function (all) {
                    res.render(`accept-petition`,{all,result,search});
                });
            });
        }
        else {
            res.redirect('/login');
        }    
    },

    getFilterpetition: function (req, res) {
        if(req.session.username) {

            var username = req.session.username;
            var search = req.query.search;

            db.findOne(User, {username: username}, null, function (result) {
                db.findMany(Petition, {progress: 100, statusicon: { "$regex" : search }}, null, function (all) {
                    if(search == "fa-spinner")
                        search = "Pending";
                    else if(search == "fa-times-circle")
                        search = "Rejected";
                    else if(search == "fa-check-square")
                        search = "Accepted";  
                    else if(search == "fa-task")
                        search = "New";   
                    res.render(`accept-petition`,{all,result, search});
                });
            });
        }
        else {
            res.redirect('/login');
        }
            
    },

    getAcceptpetition: function (req, res) {
        if(req.session.username) {

            var petitionid = req.query.petitionid;
            
            var status = {
                statusicon: "fa fa-check-square"
            }

            var today = new Date();
            var formattedDate = today.getFullYear().toString() + '-' + (today.getMonth() + 1).toString().padStart(2, 0) + '-' + today.getDate().toString().padStart(2, 0);

            db.findOne(Petition, {petitionid: petitionid}, null, function (result) {
          
                db.updateOne(Petition, result, status, function (data) {});
                var ownerNotif = 
                {
                    username: result.username, 
                    petitionusername: result.username,
                    petitionid: petitionid,
                    coursecode: result.coursecode,
                    type: "my",
                    statusicon: "fa fa-check",
                    date: formattedDate                                   
                }

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
                            signeeNotif.statusicon = "fa fa-check";
                            signeeNotif.date = formattedDate;

                            db.insertOne(Notification, signeeNotif, function(notifResult){
                                inserted = notifResult;
                            })
                        }
                    }
                });

                res.send("true");
            });
        }
        else {
            res.redirect('/login');
        }
            
    },

    getRejectpetition: function (req, res) {
        if(req.session.username) {

            var petitionid = req.query.petitionid;
            
            var status = {
                statusicon: "fa fa-times-circle"
            }

            var today = new Date();
            var formattedDate = today.getFullYear().toString() + '-' + (today.getMonth() + 1).toString().padStart(2, 0) + '-' + today.getDate().toString().padStart(2, 0);

            db.findOne(Petition, {petitionid: petitionid}, null, function (result) {
          
                db.updateOne(Petition, result, status, function (data) {});
                var ownerNotif = 
                {
                    username: result.username, 
                    petitionusername: result.username,
                    petitionid: petitionid,
                    coursecode: result.coursecode,
                    type: "my",
                    statusicon: "fa fa-close",
                    date: formattedDate                                   
                }

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
                            signeeNotif.statusicon = "fa fa-close";
                            signeeNotif.date = formattedDate;

                            db.insertOne(Notification, signeeNotif, function(notifResult){
                                inserted = notifResult;
                            })
                        }
                    }
                });

                res.send("true");
            });
        }
        else {
            res.redirect('/login');
        }
            
    },

    getPendingpetition: function (req, res) {
        if(req.session.username) {

            var petitionid = req.query.petitionid;
            
            var status = {
                statusicon: "fa fa-spinner"
            }

            var today = new Date();
            var formattedDate = today.getFullYear().toString() + '-' + (today.getMonth() + 1).toString().padStart(2, 0) + '-' + today.getDate().toString().padStart(2, 0);

            db.findOne(Petition, {petitionid: petitionid}, null, function (result) {

                db.updateOne(Petition, result, status, function (data) {});
                var ownerNotif = 
                {
                    username: result.username, 
                    petitionusername: result.username,
                    petitionid: petitionid,
                    coursecode: result.coursecode,
                    type: "my",
                    statusicon: "fa fa-book",
                    date: formattedDate                                   
                }

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
                            signeeNotif.statusicon = "fa fa-book";
                            signeeNotif.date = formattedDate;

                            db.insertOne(Notification, signeeNotif, function(notifResult){
                                inserted = notifResult;
                            })
                        }
                    }
                });

                res.send("true");
            });
        }
        else {
            res.redirect('/login');
        }
            
    }
}

/*
    exports the object `controller` (defined above)
    when another script exports from this file
*/
module.exports = acceptpetitionController;
