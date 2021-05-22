
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const Petition = require('../models/PetitionModel.js');

const User = require('../models/UserModel.js');

const Signee = require('../models/SigneeModel.js');

const Comment = require('../models/CommentModel.js');

/*
    defines an object which contains functions executed as callback
    when a client requests for `Register` paths in the server
*/

const petitionController = {

    getPetition: function(req,res){
        var username = req.params.username;
        var petitionid = req.params.petitionid;
        var flag = false;

        //gets the petition requested in the path based on petition id
        db.findOne(Petition, {petitionid: petitionid}, null, function (petitionResult){
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
        });
    },


    getEditDays: function(req,res){
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

    },

    getEditTimeSlot: function(req,res){
        var startTime = req.query.startTime;
        var endTime = req.query.endTime;
        var petitionid = req.query.petitionid;
        
        db.updateOne(Petition, {petitionid: petitionid}, {starttime: startTime, endtime: endTime}, function(data){
                if(data != null)
                    res.send("true");
                else
                    res.send("false");
        });
    },

    getSignPetition: function(req,res){

        var petitionId = req.query.petitionid;
        var curUserName = req.query.curusername;

        console.log("curUsername: " + curUserName);
        
        db.findOne(Petition, {petitionid: petitionId}, null, function (petitionResult){
            if(petitionResult != null){
                var numStudents = petitionResult.numstudents;
                var numSigned = petitionResult.signed;

                var newSigned = parseInt(numSigned) + 1;
                var newProgress = (parseInt(newSigned) / parseInt(numStudents)) * 100;

                db.updateOne(Petition, petitionResult, {signed: newSigned, progress: newProgress},function(data){
                    if(data != null){

                        db.findOne(User, {username: curUserName}, null, function(curUserResult){
                            if(curUserResult != null){

                                var signee = {
                                    username: curUserResult.username,
                                    first: curUserResult.first,
                                    last: curUserResult.last,
                                    idnum: curUserResult.idnum,
                                    email: curUserResult.email,
                                    petitionid: petitionId 
                                }

                                db.insertOne(Signee, signee, function (result){
                                     res.send("true");
                                })

                            }
                            else{
                                res.send("false");
                            }
                        })
                    }
                    else
                        res.send("false");
                });
            }
            else{
                res.send("false");
            }

        });
    },

    getUnsignPetition: function(req,res){
        var petitionId = req.query.petitionid;
        var curUserName = req.query.curusername;

        console.log("curUsername in unsign: " + curUserName);

        db.findOne(Petition, {petitionid: petitionId}, null, function (petitionResult){
            if(petitionResult != null){
                var numStudents = petitionResult.numstudents;
                var numSigned = petitionResult.signed;

                var newSigned = parseInt(numSigned) - 1;
                var newProgress = (parseInt(newSigned) / parseInt(numStudents)) * 100;

                db.updateOne(Petition, petitionResult, {signed: newSigned, progress: newProgress},function(data){
                    if(data != null){
                        db.deleteOne(Signee, {username: curUserName}, function(deleteResult){
                            res.send(deleteResult);
                        });
                    }
                    else
                        res.send("false");
                });
            }
            else{
                res.send("false");
            }   

        });
    },

    getComment: function(req,res){
       
       var commentContent = req.query.commentcontent;
       var firstName = req.query.firstname;
       var lastName = req.query.lastname;
       var petitionId = req.query.petitionid;
       var curUsername = req.query.curusername;
       var date = req.query.date;
       
       console.log("comment: " + commentContent + "/ first: " + firstName + "/ last: " + lastName + "/ petition id: " + petitionId + "/ date: " + date);

       var comment = {
         username: curUsername,
         first: firstName,
         last: lastName,
         date: date,
         petitionid: petitionId,
         commentcontent: commentContent
       }

       db.insertOne(Comment, comment, function(result){
            if(result != null){
                res.send("true");
            }
            else{
                res.send("false");
            }
       });
    }


}

/*
    exports the object `controller` (defined above)
    when another script exports from this file
*/
module.exports = petitionController;
