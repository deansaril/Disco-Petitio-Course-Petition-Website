
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');
/*
    defines an object which contains functions executed as callback
    when a client requests for `index` paths in the server
*/
const homeController = {

    /*
        executed when the client sends an HTTP GET request `/`
        as defined in `../routes/routes.js`
    */
    getHome: function (req, res) {

        var username = req.params.username;
        //res.render(`edit-prof`,username);
        //var username = req.query.param;
        //res.send(username);
        //res.render(`edit-prof`);
        db.findOne(User, {username: username}, null, function (result) {
            res.render(`home`,result);
        });

           //     res.redirect('/home?username=' + result.username);

        // render `../views/index.hbs`
        // res.send(username);
        //res.render(`home`, user);
    }
}

/*
    exports the object `controller` (defined above)
    when another script exports from this file
*/
module.exports = homeController;
