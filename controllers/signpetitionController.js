
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const Petition = require('../models/PetitionModel.js');

const User = require('../models/UserModel.js');

/*
    defines an object which contains functions executed as callback
    when a client requests for `Register` paths in the server
*/

const signpetitionController = {

    getSignpetition: function (req, res) {
        var username = req.params.username;
        //res.render(`edit-prof`,username);
        //var username = req.query.param;
        //res.send(username);
        //res.render(`edit-prof`);
        db.findOne(User, {username: username}, null, function (result) {
            //res.render(`my-petition`,result);
            db.findMany(Petition, null, null, function (all) {
                // res.send(result);
                res.render(`sign-petition`,{all,result});
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
            db.findMany(Petition, {coursetype: search}, null, function (all) {
                res.render(`sign-petition`,{all,result,search});
            });
        });
    },

    getSearchpetition: function (req, res) {
        // res.send(`test`);
        var username = req.params.username;
        var tempsearch = req.query.search;
        var search = tempsearch.toUpperCase();
        //res.send(`test ` + search + ` ` + username);
        db.findOne(User, {username: username}, null, function (result) {
            db.findMany(Petition, {coursecode: { "$regex" : search }}, null, function (all) {
                res.render(`sign-petition`,{all,result,search});
            });
        });
    }
}

/*
    exports the object `controller` (defined above)
    when another script exports from this file
*/
module.exports = signpetitionController;
