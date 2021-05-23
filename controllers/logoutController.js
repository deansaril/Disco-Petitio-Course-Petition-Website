
/*
    defines an object which contains functions executed as callback
    when a client requests for `logout` paths in the server
*/
const logoutController = {

    /*
        executed when the client sends an HTTP GET request `/logout`
        as defined in `../routes/routes.js`
    */
    getLogOut: function (req, res) {

        req.session.destroy();
        req.session.cookie.expires = new Date().getTime();

        res.redirect('/');

    }

}

/*
    exports the object `logoutController` (defined above)
    when another script exports from this file
*/
module.exports = logoutController;
