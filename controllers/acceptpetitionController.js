
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const Petition = require('../models/PetitionModel.js');

const User = require('../models/UserModel.js');

/*
    defines an object which contains functions executed as callback
    when a client requests for `Register` paths in the server
*/


const acceptpetitionController = {

    getAcceptpetition: function (req, res) {
        var username = req.params.username;
        //res.render(`edit-prof`,username);
        //var username = req.query.param;
        //res.send(username);
        //res.render(`edit-prof`);
        db.findOne(User, {username: username}, null, function (result) {
            //res.render(`my-petition`,result);
            db.findMany(Petition, {progress: 100}, null, function (all) {
                // res.send(result);
                res.render(`accept-petition`,{all,result});
                //res.send(all);
                // res.render(`my-petition`, { 
                //     friends:[ 
                //         {fn: `“Ned”`, ln: `“Stark”`}, 
                //         {fn: `“Cat”`, ln: `“Tully”`}
                //     ]
                // });
            });
        });
    },

    getSearchtypepetition: function (req, res) {
        // res.send(`test`);
        var username = req.params.username;
        var tempsearch = req.query.search;
        var search = tempsearch.toUpperCase();
        //res.send(`test ` + search + ` ` + username);
        db.findOne(User, {username: username}, null, function (result) {
            db.findMany(Petition, {progress: 100, coursetype: search, username: username}, null, function (all) {
                res.render(`accept-petition`,{all,result,search});
            });
        });
    },

    getFilterpetition: function (req, res) {
        var username = req.params.username;
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
    },

    getAcceptpetition: function (req, res) {
        var petitionid = req.query.petitionid;
        
        var status = {
            statusicon: "fa fa-check-square"
        }

        db.findOne(Petition, {petitionid: petitionid}, null, function (result) {
            db.updateOne(Petition, result, status, function (data) { 
                if(data != null)
                    res.send("true");
                else
                    res.send("false");
            });
        });
    },

    getRejectpetition: function (req, res) {
        var petitionid = req.query.petitionid;
        
        var status = {
            statusicon: "fa fa-times-circle"
        }

        db.findOne(Petition, {petitionid: petitionid}, null, function (result) {
            db.updateOne(Petition, result, status, function (data) { 
                if(data != null)
                    res.send("true");
                else
                    res.send("false");
            });
        });
    },

    getPendingpetition: function (req, res) {
        var petitionid = req.query.petitionid;
        
        var status = {
            statusicon: "fa fa-spinner"
        }

        db.findOne(Petition, {petitionid: petitionid}, null, function (result) {
            db.updateOne(Petition, result, status, function (data) { 
                if(data != null)
                    res.send("true");
                else
                    res.send("false");
            });
        });
    }
}

/*
    exports the object `controller` (defined above)
    when another script exports from this file
*/
module.exports = acceptpetitionController;