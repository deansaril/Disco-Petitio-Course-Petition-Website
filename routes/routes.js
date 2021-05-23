
// import module `express`
const express = require('express');

const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage });

// import module `controller` from `../controllers/controller.js`
const controller = require('../controllers/controller.js');

const registerController = require('../controllers/registerController.js');

const loginController = require('../controllers/loginController.js');

const homeController = require('../controllers/homeController.js');

const editprofController = require('../controllers/editprofController.js');

const createpetitionController = require('../controllers/createpetitionController.js');

const mypetitionController = require('../controllers/mypetitionController.js');

const signpetitionController = require('../controllers/signpetitionController.js');

const acceptpetitionController = require('../controllers/acceptpetitionController.js');

const petitionController = require('../controllers/petitionController.js')

const logoutController = require('../controllers/logoutController.js')

const validation = require('../helpers/validation.js');

const app = express();

app.get('/', controller.getIndex);

// app.get('/favicon.ico', controller.getFavicon);

app.get('/register', registerController.getRegister);

app.post('/register', validation.registerValidation(), registerController.postRegister);

app.get('/getCheckUsername', registerController.getCheckUsername);

app.get('/login', loginController.getLogin);

app.post('/login', validation.loginValidation(), loginController.postLogin);

app.get('/home/:username', homeController.getHome);

app.get('/editprof/:username', editprofController.getEditprof);

app.post('/editprof/:username/avatar', upload.single('picfile'), editprofController.postEditpic);

app.post('/editprof/:username', validation.editValidation(), editprofController.postEditprof);

app.get('/getCheckID', editprofController.getCheckID);

app.get('/getCheckEmail', editprofController.getCheckEmail);

app.get('/getUserInfo', editprofController.getUserInfo);

app.get('/getDeleteUser', editprofController.getDeleteUser);

app.get('/createpetition/:username', createpetitionController.getCreatepetition);

app.post('/createpetition/:username', validation.petitionValidation(), createpetitionController.postCreatepetition);

app.get('/mypetition/:username', mypetitionController.getMypetition);

app.get('/mypetition/:username/type', mypetitionController.getSearchtypepetition);

app.get('/mypetition/:username/find', mypetitionController.getSearchpetition);

app.get('/signpetition/:username', signpetitionController.getSignpetition);

app.get('/signpetition/:username/find', signpetitionController.getSearchpetition);

app.get('/signpetition/:username/type', signpetitionController.getSearchtypepetition);

app.get('/acceptpetition/:username', acceptpetitionController.getAcceptpetition);

app.get('/acceptpetition/:username/type', acceptpetitionController.getSearchtypepetition);

app.get('/acceptpetition/:username/filter', acceptpetitionController.getFilterpetition);

app.get('/getAcceptpetition', acceptpetitionController.getAcceptpetition);

app.get('/getRejectpetition', acceptpetitionController.getRejectpetition);

app.get('/getPendingpetition', acceptpetitionController.getPendingpetition);

app.get('/getLogOut', logoutController.getLogOut);

//added routes for petition

app.get('/petition/:username/:petitionid', petitionController.getPetition);

//AJAX path for editing the days
app.get('/editDays', petitionController.getEditDays);

//AJAX path for editing the time slot
app.get('/editTimeSlot', petitionController.getEditTimeSlot);

//AJAX path for signing a petition
app.get('/signPetition', petitionController.getSignPetition);

//AJAX path for unsigning a petition
app.get('/unsignPetition', petitionController.getUnsignPetition);

//AJAX path for commenting in a petition
app.get('/getComment', petitionController.getComment);

module.exports = app;
