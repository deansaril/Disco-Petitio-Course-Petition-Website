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

const app = express();

dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;

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

// if the route is not defined in the server, render `../views/error.hbs`
// always define this as the last middleware
// app.use(function (req, res) {
//     res.render('error');
// });

// connects to the database
db.connect();

// binds the server to a specific port
app.listen(port, function () {
    console.log('app listening at port ' + port);
});
