const dotenv = require(`dotenv`);

// import module `express`
const express = require('express');

// import module `hbs`
const hbs = require('hbs');

// import module `routes` from `./routes/routes.js`
const routes = require('./routes/routes.js');

// import module `database` from `./model/db.js`
const db = require('./models/db.js');

//const bodyParser = require(`body-parser`);

// import module `express-session`
const session = require('express-session');

// import module `mongoose`
const mongoose = require('mongoose');

// import module `connect-mongo`
const MongoStore = require('connect-mongo');

const app = express();

dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;

db.connect();

// use `express-session`` middleware and set its options
// use `MongoStore` as server-side session storage
console.log(`this is    ` + process.env.DB_URL);
app.use(session({
    'secret': 'disco-petitio',
    'resave': false,
    'saveUninitialized': false,
    store: MongoStore.create({
	    mongoUrl: process.env.DB_URL,
	    ttl: 21 * 24 * 60 * 60 // = 21 days. Default
	  })
}));


// set `hbs` as view engine
app.set('view engine', 'hbs');

// sets `/views/partials` as folder containing partial hbs files
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('zerolength', function (v1, v2, options) {
'use strict';
   if (v1.length===v2) {
     return options.fn(this);
  }
  return options.inverse(this);
});

hbs.registerHelper('checklength', function (v1, v2, options) {
'use strict';
   if (v1.length<v2) {
     return options.fn(this);
  }
  return options.inverse(this);
});

// parses incoming requests with urlencoded payloads
app.use(express.urlencoded({extended: true}));

// set the folder `public` as folder containing static assets
// such as css, js, and image files
app.use(express.static('public'));

//app.use(bodyParser.urlencoded({ extended: false}));

// define the paths contained in `./routes/routes.js`
app.use('/', routes);

app.use(function (req, res) {

    var details = {};

    /*
        checks if a user is logged-in by checking the session data
        if a user is logged-in,
        display the profile tab and logout tab in the nav bar.
    */
    if(req.session.username) {
        details.flag = true;
        details.name = req.session.name;
        details.idNum = req.session.idNum;
    }

    /*
        if no user is logged-in,
        do not display the profile tab and the logout tab in the nav bar.
    */
    else
        details.flag = false;

    // render `../views/error.hbs`
    res.render(`index`);
});

// if the route is not defined in the server, render `../views/error.hbs`
// always define this as the last middleware
// app.use(function (req, res) {
//     res.render('error');
// });

// binds the server to a specific port
app.listen(port, function () {
    console.log('app listening at port ' + port);
});
