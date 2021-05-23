
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

// import module `bcrypt` for password hashing
const bcrypt = require('bcrypt');
const saltRounds = 10;

/*
    defines an object which contains functions executed as callback
    when a client requests for `Register` paths in the server
*/


const registerController = {

    getRegister: function (req, res) {

        // render `../views/index.hbs`
        if(req.session.username) {

            res.redirect('/home/' + req.session.username);
        }
        else {
            res.render(`register`);
        }
    },

    postRegister: function (req, res) {
        /*
            when submitting forms using HTTP POST method
            the values in the input fields are stored in `req.body` object
            each <input> element is identified using its `name` attribute
            Example: the value entered in <input type="text" name="fName">
            can be retrieved using `req.body.fName`
        */

        if(req.session.username) {

            res.redirect('/home/' + req.session.username);
        }
        else {
            var username = req.body.username;
            var first = req.body.first;
            var last = req.body.last;
            var idnum = req.body.idnum;
            var email = req.body.email;
            var pass = req.body.pass;
            var picname = "avatar.png";
            //var con_pass = req.body.con_pass;

            bcrypt.hash(pass, saltRounds, function(err,hash){

                var user = {
                    username: username,
                    first: first,
                    last: last,
                    idnum: idnum,
                    email: email,
                    pass: hash,
                    picname: picname
                    //con_pass: con_pass
                }

                /*
                    calls the function insertOne()
                    defined in the `database` object in `../models/db.js`
                    this function adds a document to collection `users`
                */
                db.insertOne(User, user, function(flag) {
                    if(flag) {
                        /*
                            upon adding a user to the database,
                            redirects the client to `/success` using HTTP GET,
                            defined in `../routes/routes.js`
                            passing values using URL
                            which calls getSuccess() method
                            defined in `./successController.js`
                        */
                        res.redirect('/login');
                        //res.redirect('/success?username=' + username);
                        //res.redirect('/success?fName=' + `john` +'&lName=' + `smith` + '&idNum=' + `11312345`);
                    }
                });
            });
        }
    },

    getCheckUsername: function (req, res) {
        /*
            when passing values using HTTP GET method
            the values are stored in `req.body` object
            Example url: `http://localhost/getCheckID?idNum=11312345`
            To retrieve the value of parameter `idNum`: `req.body.idNum`
        */
        if(req.session.username) {

            res.redirect('/home/' + req.session.username);
        }
        else {
            var username = req.query.username;

            console.log(username);
            /*
                calls the function findOne()
                defined in the `database` object in `../models/db.js`
                searches for a single document based on the model `User`
                sends an empty string to the user if there are no match
                otherwise, sends an object containing the `idNum`
            */
            db.findOne(User, {username: username}, 'username', function (result) {
                res.send(result);
            });
        }   
    }
}

/*
    exports the object `controller` (defined above)
    when another script exports from this file
*/
module.exports = registerController;
