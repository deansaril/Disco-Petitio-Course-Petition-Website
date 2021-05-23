
// import module `bcrypt`
const bcrypt = require('bcrypt');

// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

const { validationResult }  = require('express-validator');
/*
    defines an object which contains functions executed as callback
    when a client requests for `Register` paths in the server
*/


const loginController = {

    getLogin: function (req, res) {

        if(req.session.username) {

            res.redirect('/home/' + req.session.username);
        }
        else {
            var error = 'Welcome to our website!';
            res.render('index',{error});
        }
    },

    postLogin: function (req, res) {
        if(req.session.username) {

            res.redirect('/home/' + req.session.username);
        }
        else {

            var errors = validationResult(req);
            if (!errors.isEmpty()) {

                errors = errors.errors;

                var details = {};
                for(i = 0; i < errors.length; i++)
                    details[errors[i].param + 'Error'] = errors[i].msg;

                console.log(details);

                res.render('index', {details});
            }else {
                var account = {
                    username: req.body.username,
                    pass: req.body.pass
                }
                        
                    var error = 'Invalid Credentials.';
                    db.findOne(User, {username: account.username}, null, function (result) {
                        if(result != null){

                            bcrypt.compare(account.pass, result.pass, function(err, equal){
                                if(equal){
                                    req.session.username = account.username;
                                    res.redirect('/home/' + account.username);
                                }
                                else{
                                    error = 'Invalid Credentials';
                                    res.render(`index`,{error});
                                }
                            });
                            
                        }
                        else
                            res.render(`index`,{error});
                });
            }
        }      
    }
}

/*
    exports the object `controller` (defined above)
    when another script exports from this file
*/
module.exports = loginController;
