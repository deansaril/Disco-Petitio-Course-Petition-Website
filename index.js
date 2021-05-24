const dotenv = require(`dotenv`);

// import module `express`
const express = require('express');

// import module `hbs`
const hbs = require('hbs');

// import module `routes` from `./routes/routes.js`
const routes = require('./routes/routes.js');

// import module `database` from `./model/db.js`
const db = require('./models/db.js');

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
	store: MongoStore.create({mongoUrl: process.env.DB_URL})
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


//Additional Helpers By Dean
hbs.registerHelper('statusString', function(statusIcon) {
	var value = "Undecided";
	if(statusIcon == "fa fa-tasks"){
		value = 'Ongoing';
	} 
	else if(statusIcon == "fa fa-spinner"){
		value = 'Pending';
	}
	else if(statusIcon == "fa fa-check-square"){
		value = 'Approved';
	}
	else if(statusIcon == "fa fa-times-circle"){
		value = 'Disapproved';
	}
	else if(statusIcon == "fa fa-check"){
		value = 'Approved';
	}
	else if(statusIcon == "fa fa-close"){
		value = 'Disapproved';
	}
	else if(statusIcon == "fa fa-book"){
		value = 'Pending';
	}
	else if(statusIcon == "fa fa-ban"){
		value = 'Deleted';
	}
	return value;
});

hbs.registerHelper('counter', function(index) {
	return index + 1;
});

hbs.registerHelper('ifSignedButtonType', function(hasSigned){
	var buttonType;

	if(hasSigned == true){
		buttonType = 'unsign-petition btn-secondary';
	}
	else{
		buttonType = 'sign-petition btn-primary';
	}

	return buttonType;

});

hbs.registerHelper('ifSignedButtonText', function(hasSigned){
	var buttonText;

	if(hasSigned == true){
		buttonText = 'Unsign Petition';
	}
	else{
		buttonText = 'Sign Petition';
	}

	return buttonText;

});

hbs.registerHelper('statusAlertColor', function(status){
	var value;
	if(status == "fa fa-tasks"){
		//value = 'Ongoing';
		value = 'alert-primary';
	} 
	else if(status == "fa fa-spinner"){
		//value = 'Pending';
		value = 'alert-warning';
	}
	else if(status == "fa fa-check-square"){
		//value = 'Approved';
		value= 'alert-success';
	}
	else if(status == "fa fa-times-circle"){
		//value = 'Disapproved';
		value = 'alert-danger';
	}
	return value;
});

hbs.registerHelper('statusAlertText', function(status){
	var value;
	if(status == "fa fa-tasks"){
		//value = 'Ongoing';
		value = 'This petition is still ongoing! Once required number of signatures is reached, it will be pending for approval of the university.';
	} 
	else if(status == "fa fa-spinner"){
		//value = 'Pending';
		value = 'This petition is currently pending approval from the University. Please wait and coordinate with your fellow signees for the meantime.';
	}
	else if(status == "fa fa-check-square"){
		//value = 'Approved';
		value= 'Congratulations! This petition has been approved by the university. Please coordinate with the university and your fellow signees.';
	}
	else if(status == "fa fa-times-circle"){
		//value = 'Disapproved';
		value = 'Sorry! This petition is disapproved by the university. Please start or sign another petition.';
	}
	return value;
});

hbs.registerHelper('ifOwnComment', function(commentUsername, curUsername){
	var value;
	
	if(commentUsername == curUsername){
		value = "d-inline";
	}
	else{
		value = "d-none";
	}
	return value;
});

hbs.registerHelper('completeProgress', function(progress){
	var value = true;
	
	if(progress == 100){
		value = false;
	}
	return value;
});

hbs.registerHelper('commentNotif', function(statusIcon){
	var value = false;
	
	if(statusIcon == 'fa fa-comment'){
		value = true;
	}
	else{
		value  = false;
	}
	return value;
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
