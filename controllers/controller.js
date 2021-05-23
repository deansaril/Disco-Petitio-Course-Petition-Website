
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
        console.log(req.session.username);
        if(req.session.username) {

            res.redirect('/home/' + req.session.username);
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
module.exports = controller;
