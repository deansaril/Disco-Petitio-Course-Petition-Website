
// import module `check` from `express-validator`
const { check } = require('express-validator');

/*
    defines an object which contains functions
    which returns array of validation middlewares
*/
const validation = {

    /*
        function which returns an array of validation middlewares
        called when the client sends an HTTP POST request for `/signup`
    */
    loginValidation: function () {

        /*
            object `validation` is an array of validation middlewares.
            the first parameter in method check() is the field to check
            the second parameter in method check() is the error message
            to be displayed when the value to the parameter fails
            the validation
        */
        var validation = [

            // checks if `fName` is not empty
            check('username', 'Username should not be empty.').notEmpty(),

            // checks if lName is not empty
            check('pass', 'Passwords should not be empty.').notEmpty(),

            // checks if `pw` contains at least 8 characters
            // check('pass', 'Passwords should contain at least 8 characters.')
            // .isLength({min: 8})
        ];

        return validation;
    },

    editValidation: function () {

        /*
            object `validation` is an array of validation middlewares.
            the first parameter in method check() is the field to check
            the second parameter in method check() is the error message
            to be displayed when the value to the parameter fails
            the validation
        */
        var validation = [

            // checks if `fName` is not empty
            check('first', 'First name should not be empty.').notEmpty(),

            // checks if lName is not empty
            check('last', 'Last name should not be empty.').notEmpty(),

            // checks if email is valid
            check('email', 'Invalid Email.').isEmail(),

            // checks if `idNum` contains exactly 8 digits
            check('idnum', 'ID number should contain 8 digits.')
            .isLength({min: 8, max: 8}),

            // checks if `pw` contains at least 8 characters
            check('pass', 'Passwords should contain at least 8 characters.')
            .isLength({min: 8}),

            check('con_pass', 'Password does not match.').exists().custom((value, { req }) => value === req.body.pass)
        ];

        return validation;
    },

    registerValidation: function () {

        /*
            object `validation` is an array of validation middlewares.
            the first parameter in method check() is the field to check
            the second parameter in method check() is the error message
            to be displayed when the value to the parameter fails
            the validation
        */
        var validation = [

            // checks if `fName` is not empty
            check('username', 'Username should contain at least 3 characters.')
            .isLength({min: 3, max: 20}),

            // checks if `fName` is not empty
            check('first', 'First name should not be empty.').notEmpty(),

            // checks if lName is not empty
            check('last', 'Last name should not be empty.').notEmpty(),

            // checks if email is valid
            check('email', 'Invalid Email.').isEmail(),

            // checks if `idNum` contains exactly 8 digits
            check('idnum', 'ID number should contain 8 digits.')
            .isLength({min: 8, max: 8}),

            // checks if `pw` contains at least 8 characters
            check('pass', 'Passwords should contain at least 8 characters.')
            .isLength({min: 8}),

            check('con_pass', 'Password does not match.').exists().custom((value, { req }) => value === req.body.pass)
        ];

        return validation;
    }
}

/*
    exports the object `validation` (defined above)
    when another script exports from this file
*/
module.exports = validation;
