
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

const petitionController = {

    getPetition: function(req,res){
        if(req.session.username) {

                 var username = req.session.username;
                 var ownerusername = req.params.username;
                 var petitionid = req.params.petitionid;
                 var flag = false;

            //gets the petition requested in the path based on petition id
            db.findOne(Petition, {petitionid: petitionid, username: ownerusername}, null, function (petitionResult){
                if(petitionResult != null){

                    //gets the User or the owner of the petition
                    db.findOne(User, {username: petitionResult.username}, null, function (userResult){
                        if(userResult != null){
                            //db findOne(Signee, {username: username, petitionid: petitionid})
                            db.findOne(User, {username: username}, null, function(curUserResult){
                                if(username == userResult.username){
                                    flag = true;
                                }
                                db.findMany(Signee, {petitionid: petitionid}, null, function (signeeResult){

                                    if(signeeResult != null){
                                        db.findOne(Signee, {username: username, petitionid: petitionid}, null, function(signed){

                                            var hasSigned = false;
                                            //If current user logged in has already signed
                                            if(signed != null){
                                                hasSigned = true;
                                            }

                                            db.findMany(Comment, {petitionid: petitionid}, null, function (comments){
                                                /*
                                                    petitionResult is the petition being requested
                                                    userResult is the owner of the petition
                                                    signeeResult is the signees of the petition
                                                    curUserResult is the user currently logged in
                                                    hasSigned is if the user has already signed the petition
                                                    comments is the array of comments in the petition
                                                    ownerUsername is the username of the owner of the petition
                                                */
                                                res.render('petition', {petitionResult, userResult, flag, signeeResult, curUserResult, hasSigned, comments});
                                            });
                                        });
                                    }
                                });

                            });
                        }
                    });
                }
                else{
                    db.findOne(User, {username: username}, null, function(userResult){
                        res.render('error',{userResult});
                    });
                }
        });
        }
        else {
            res.redirect('/login');
        }
            
    },


    getEditDays: function(req,res){
        if(req.session.username) {

            var checkedDays = req.query.checkedDays;
            var petitionid = req.query.petitionid;

            //console.log("checkedDays is: " + checkedDays + "/ petitionid is: " + petitionid);
            //if more than one day is selected
            if(checkedDays.length > 1){
                db.updateOne(Petition, {petitionid: petitionid}, {day1: checkedDays[0], day2: checkedDays[1]}, function(data){
                    if(data != null)
                        res.send("true");
                    else
                        res.send("false");
                });
            }
            else{
                db.updateOne(Petition, {petitionid: petitionid}, {day1: checkedDays[0], day2: checkedDays[1]}, function(data){
                    if(data != null)
                        res.send("true");
                    else
                        res.send("false");
                });
            }
        }
        else {
            res.redirect('/login');
        }
            

    },

    getEditTimeSlot: function(req,res){

        if(req.session.username) {

            var startTime = req.query.startTime;
            var endTime = req.query.endTime;
            var petitionid = req.query.petitionid;
            
            db.updateOne(Petition, {petitionid: petitionid}, {starttime: startTime, endtime: endTime}, function(data){
                    if(data != null)
                        res.send("true");
                    else
                        res.send("false");
            });
        }
        else {
            res.redirect('/login');
        }
            
    },

    getDeletePetition: function (req,res){

        var petitionid = req.query.petitionid;

        var today = new Date();
        var formattedDate = today.getFullYear().toString() + '-' + (today.getMonth() + 1).toString().padStart(2, 0) + '-' + today.getDate().toString().padStart(2, 0);

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
                res.send("true");
            });

    },

    getSignPetition: function(req,res){

        if(req.session.username) {

            var petitionId = req.query.petitionid;
            var curUserName = req.query.curusername;

            db.findOne(Petition, {petitionid: petitionId}, null, function (petitionResult){
                if(petitionResult != null){
                    var numStudents = petitionResult.numstudents;
                    var numSigned = petitionResult.signed;

                    var newSigned = parseInt(numSigned) + 1;
                    var newProgress = parseInt((parseInt(newSigned) / parseInt(numStudents)) * 100);

                    console.log("newProgress after signing is: " + newProgress);

                    db.updateOne(Petition, petitionResult, {signed: newSigned, progress: newProgress},function(data){
                        if(data){

                            db.findOne(User, {username: curUserName}, null, function(curUserResult){
                                if(curUserResult){

                                    var signee = {
                                        username: curUserResult.username,
                                        first: curUserResult.first,
                                        last: curUserResult.last,
                                        idnum: curUserResult.idnum,
                                        email: curUserResult.email,
                                        petitionid: petitionId 
                                    }

                                    db.insertOne(Signee, signee, function (result){
                                        res.send(""+result);
                                    });
                                }
                            })
                        };
                    });
                }
            });


        }
        else {
            res.redirect('/login');
        }            
    },

    getUnsignPetition: function(req,res){



            var petitionId = req.query.petitionid;
            var curUserName = req.query.curusername;


            db.findOne(Petition, {petitionid: petitionId}, null, function (petitionResult){
                if(petitionResult != null){
                    var numStudents = petitionResult.numstudents;
                    var numSigned = petitionResult.signed;

                    var newSigned = parseInt(numSigned) - 1;
                    var newProgress = parseInt((parseInt(newSigned) / parseInt(numStudents)) * 100);

                    console.log("newProgress after unsigning is: " + newProgress);


                    db.updateOne(Petition, petitionResult, {signed: newSigned, progress: newProgress},function(data){
                        if(data){
                            console.log("Updated petition. Now deleting the user.");
                            db.deleteOne(Signee, {username: curUserName, petitionid: petitionResult.petitionid}, function(deleteResult){
                                res.send("" + deleteResult); 
                            });
                        }
                    });
                }
            });
            
    },

    getComment: function(req,res){
        if(req.session.username) {

           var commentContent = req.query.commentcontent;
           var firstName = req.query.firstname;
           var lastName = req.query.lastname;
           var petitionId = req.query.petitionid;
           var curUsername = req.query.curusername;
           var curUserPic = req.query.curuserpic;
           var date = req.query.date;

           var comment = {
             username: curUsername,
             first: firstName,
             last: lastName,
             date: date,
             petitionid: petitionId,
             commentcontent: commentContent,
             picname: curUserPic
           }

           //looks for the petition being commented on
           db.findOne(Petition, {petitionid: petitionId}, null, function(petitionResult){

                //looks for the owner of the petition
                db.findOne(User, {username: petitionResult.username}, null, function(userResult){

                    var commentNotif = 
                    {
                        username: userResult.username, 
                        petitionusername: userResult.username,
                        first: firstName,
                        last: lastName,
                        petitionid: petitionId,
                        coursecode: petitionResult.coursecode,
                        type: "my",
                        statusicon: "fa fa-comment",
                        date: date                                   
                    }

                    db.insertOne(Comment, comment, function(result){

                            //If current user logged in is not the owner of the petition being commented on
                            if(curUsername != commentNotif.petitionusername){
                                db.insertOne(Notification, commentNotif, function(notifResult){
                                 });
                            }
                            res.send("true");
                    });
                })
           })
        }
        else {
            res.redirect('/login');
        }  
    },

    getDeleteComment: function(req,res){

        var petitionId = req.query.petitionid;
        var commentUsername = req.query.commentusername;
        var commentContent = req.query.commentcontent;
        console.log("Pet id: " + petitionId + "username: " + commentUsername);

        db.deleteOne(Comment, {petitionid: petitionId, username: commentUsername, commentcontent: commentContent}, function(delComment){
            if(delComment){
                res.send("true");
            }
            else{
                res.send("false");
            }
        });
    },
    
    getPetitionInfo: function (req, res) {
        if(req.session.username) {

            var petitionid = req.query.petitionid;
            // console.log(`TEST: ` + petitionid);
            db.findOne(Petition, {petitionid: petitionid}, null, function (result) {
                res.send(result);
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
module.exports = petitionController;
