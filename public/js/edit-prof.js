$(document).ready(function () {
	$("#thisModal").modal('show');  
    function isFilled() {

        var first = validator.trim($('#first').val());
        var last = validator.trim($('#last').val());
        var email = validator.trim($('#email').val());
	    var idnum = validator.trim($('#idnum').val());
        var pass = validator.trim($('#pass').val());
        var con_pass = validator.trim($('#con_pass').val());

        var firstEmpty = validator.isEmpty(first);
        var lastEmpty = validator.isEmpty(last);
        var emailEmpty = validator.isEmpty(email);
	    var idnumEmpty = validator.isEmpty(idnum);
	    var passEmpty = validator.isEmpty(pass);
	    var con_passEmpty = validator.isEmpty(con_pass);

	    return !firstEmpty && !lastEmpty && !idnumEmpty && !passEmpty && !con_passEmpty;
    }

    function isValidEmail(field, callback) {

        var email = validator.trim($('#email').val());

    	var isvalidemail = emailvalidation(email);

    	if(!isvalidemail && field.is($('#email'))){
			alertbox.style.display = "block";
			$('#alerttext').html('<strong>' + email + '</strong> is an invalid email address');
			return callback(false);
		}else {
			$.get('/getCheckEmail', {email: email}, function (result) {	
                if(result.email != email) {

                    if(field.is($('#email')))
                       $('#alerttext').html('This is an <strong>alert</strong>. This is to show alert messages to the user.');
                    $('#email').css('background-color', 'white');
                    return callback(true);

                }
                else {

                    if(field.is($('#email')) && $('#username').val() != result.username){
                        $('#alerttext').html('<strong>Email Address</strong> already registered');
                        $('#email').css('background-color', '#dc3545');
                        return callback(false);
                    }
                                        
                    
                }
            });
		} 
		return callback(true);   
    }

    function isValidID(field, callback) {

        var idnum = validator.trim($('#idnum').val());

        var isValidLength = validator.isLength(idnum, {min: 8, max: 8});

        if(isValidLength) {

        	var isvalidusername = idvalidation(idnum);

        	if(!isvalidusername){
				alertbox.style.display = "block";
				$('#alerttext').html('<strong>' + idnum + '</strong> is an invalid id number');
			}else {
				$.get('/getCheckID', {idnum: idnum}, function (result) {	
	                if(result.idnum != idnum) {

	                    if(field.is($('#idnum')))
	                       $('#alerttext').html('This is an <strong>alert</strong>. This is to show alert messages to the user.');
	                   	$('#idnum').css('background-color', 'white');
	                    return callback(true);

	                }
	                else {

	                    if(field.is($('#idnum')) && $('#username').val() != result.username){
	                        $('#alerttext').html('<strong>ID number</strong> already registered');
	                        $('#idnum').css('background-color', '#dc3545');
	                        return callback(false);
	                    }
	                    return callback(true);
	                }
	            });
			}    
        }

        else {

            if(field.is($('#idnum')))
                $('#alerttext').html('ID Number should contain <strong>8</strong> digits.');

            return callback(false);
        }     
    }

    function isValidPassword(field) {

        var validPassword = false;

        var pass = validator.trim($('#pass').val());
        var isValidLength = validator.isLength(pass, {min: 8});

        if(isValidLength) {

        	var isvaliduserpass = passvalidation(pass);

        	if(!isvaliduserpass && field.is($('#pass'))){
				alertbox.style.display = "block";
				$('#alerttext').html('Password must have at least <strong>1</strong> number.');
				return validPassword;
			}
			else if(field.is($('#pass'))){
                $('#alerttext').html('This is an <strong>alert</strong>. This is to show alert messages to the user.');
                validPassword = true;
                return validPassword;
			}

            
        }

        else {
            if(field.is($('#pass'))){
            	$('#alerttext').html('Password should contain at least <strong>8</strong> characters.');
            	return validPassword;
            }
        }

        return true;
    }

    function isConPassword(field) {

        var matchPassword = false;

        var con_pass = validator.trim($('#con_pass').val());
        var pass = validator.trim($('#pass').val());

        if(con_pass === pass) {

        	if(field.is($('#con_pass'))){
                $('#alerttext').html('This is an <strong>alert</strong>. This is to show alert messages to the user.');
			}
			matchPassword = true;
            return matchPassword;
 
        }

        else {
            if(field.is($('#con_pass'))){

            	$('#alerttext').html('Password does not <strong>match</strong>.');
            	return matchPassword;
            }
        }

      
    }

    function validateField(field, fieldName) {

        var value = validator.trim(field.val());
        var empty = validator.isEmpty(value);

        if(empty) {

            field.prop('value', '');

            $('#alerttext').html('<strong>'+ fieldName + '</strong> should not be empty.');
        }

        else
            $('#alerttext').html('This is an <strong>alert</strong>. This is to show alert messages to the user.');

        var filled = isFilled();

        var validPassword = isValidPassword(field);
        
        isValidEmail(field, function (validEmail) {

	        isValidID(field, function (validID) {

	        	var matchPassword = isConPassword(field);

	        	console.log(`filled: `+filled);
	        	console.log(`email: `+validEmail);
	        	console.log(`ID: `+validID);
	        	console.log(`pass: `+validPassword);
				console.log(`con_pass: `+matchPassword);

	            if(filled && validEmail && validID && validPassword && matchPassword)
	                $('#save').prop('disabled', false);

	            else
	                $('#save').prop('disabled', true);
	        });

        });
    }

    $('#first').keyup(function () {
        validateField($('#first'), 'First name');
    });

    $('#last').keyup(function () {
        validateField($('#last'), 'Last name');
    });

    $('#email').keyup(function () {
        validateField($('#email'), 'Email Address');
    });

    $('#idnum').keyup(function () {
        validateField($('#idnum'), 'ID Number');
    });

    $('#pass').keyup(function () {
        validateField($('#pass'), 'Password');
    });

    $('#con_pass').keyup(function () {
        validateField($('#con_pass'), 'Confirm Password');
    });
});

var save = document.getElementById("save");
var cancel = document.getElementById("cancel");
var deleteacc = document.getElementById("deleteacc");
var picfile = document.getElementById("picfile");
var alertclose = document.getElementById("alertclose");

cancel.onclick = function() {
	var username = validator.trim($('#username').val());

	$.get('/getUserInfo', {username: username}, function (result) {	
	    if(result.username == username) {
	    	$('#first').val(result.first);
	    	$('#last').val(result.last);
	    	$('#email').val(result.email);
	    	$('#idnum').val(result.idnum);
	    	$('#pass').val(result.pass);
	    	$('#con_pass').val('');
	    }
	    else {
	    	console.log('Account not found.');
	    }
	});
};

deleteacc.onclick = function() {
	$("#myModal").modal('show');

	var username = validator.trim($('#username').val());

	$("#confirmdelete").click(function(){
	  $("#myModal").modal('hide');
	  $.get('/getDeleteUser', {username: username}, function (result) {	
		    if(result) {
		    	window.location.href = '/login';
		    	console.log('Account successfully deleted.');
		    }
		    else {
		    	console.log('Account not deleted.');
		    }
		});
	});
};

picfile.onchange = function () {
    var url = this.value;
    var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
    var picmsg = document.getElementById("picmsg");
    if (this.files && this.files[0]&& (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
        var reader = new FileReader();
        var test = (this.files[0]).name;

        reader.onload = function (e) {
            $('#profpic').attr('src', e.target.result);
        }

        reader.readAsDataURL(this.files[0]);
        picmsg.innerHTML = "Photo uploaded.";
        $('#savepic').prop('disabled', false);
    }else{
         $('#profpic').attr('src', '/images/avatar.png');
         picmsg.innerHTML = "Invalid photo.";
         $('#savepic').prop('disabled', true);
    }
}

function usernamevalidation(username) {
	if(/(?!^ +$)^.+$/.test(username)){
		var regex = /^[a-zA-Z0-9_]{3,20}$/;
    	return regex.test(username)
	}
    return false;
};

function emailvalidation(email) {
	var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;		
	return regex.test(email);
};

function idvalidation(idnum) {
	if(/(?!^ +$)^.+$/.test(idnum)){
		var regex = /^[0-9]{8,8}$/;		
		return regex.test(idnum);
	}
	return false;	
};

function passvalidation(idnum) {
	var regex = /(?=.*[0-9])/;		
	return regex.test(idnum);
};

save.onclick = function() {
	var alerttext = document.getElementById("alerttext");
	var first = document.getElementById("first");
	var last = document.getElementById("last");
	var email = document.getElementById("email");
	var idnum = document.getElementById("idnum");
	var pass = document.getElementById("pass");
	var con_pass = document.getElementById("con_pass");
	var alertbox = document.getElementById("alertbox");
	

	var isvalidfirst = namevalidation(first.value);
	var isvalidlast = namevalidation(last.value);
	var isvalidemail = emailvalidation(email.value);
	var isvaliduserid = idvalidation(idnum.value);
	var isvaliduserpass = passvalidation(pass.value);

	if(!isvalidfirst){
		alertbox.style.display = "block";
		alerttext.innerHTML = first.value + " is an invalid first name."
	}
	else if(!isvalidlast){
		alertbox.style.display = "block";
		alerttext.innerHTML = last.value + " is an invalid last name."
	}
	else if(!isvalidemail){
		alertbox.style.display = "block";
		alerttext.innerHTML = email.value + " is an invalid email address."
	}
	else if(!isvaliduserid){
		alertbox.style.display = "block";
		alerttext.innerHTML = idnum.value + " is an invalid id number."
	}
	else if(!isvaliduserpass){
		alertbox.style.display = "block";
		alerttext.innerHTML = "password must have at least 1 number."
	}
	else if(pass.value != con_pass.value){
		alertbox.style.display = "block";
		alerttext.innerHTML = "password does not match."
	}
	else
		alerttext.innerHTML = "Saving Changes..."
};