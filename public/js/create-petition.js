$(document).ready(function () {
	 
	$('#coursecode').keyup(function(){
	    $(this).val($(this).val().toUpperCase());
	});


	$('.checkbox input[type=checkbox]').on('change', function (e) {
	    if ($('input[type=checkbox]:checked').length > 2) {
	        $(this).prop('checked', false);
	        $('#alerttext').html('Maxinum of <strong>two</strong> days only.');
	    }
	    else{
	    	$('#alerttext').html('This is an <strong>alert</strong>. This is to show alert messages to the user.');
	    }
	});
});

var button = document.getElementById("button");

function numvalidation(num) {
	var regex = /^[0-9]{1,4}$/;		
	return regex.test(num);
};

function codevalidation(code) {
	var regex = /^[a-zA-Z0-9_]{2,20}$/;
	return regex.test(code)
};

button.onclick = function() {
	var code = document.getElementById("course-code");
	var start = document.getElementById("start-time");
	var end = document.getElementById("end-time");
	var num = document.getElementById("num-students");

	$('#alerttext').html('This is an <strong>alert</strong>. This is to show alert messages to the user.');

	if(!codevalidation(code.value)){
		$('#alerttext').html('Invalid<strong> course code</strong>.');
	}
	else if ($('input[type=checkbox]:checked').length === 0){
		$('#alerttext').html('Select at least <strong> one</strong> day.');
        document.getElementById("errordays").innerHTML = " Select at least one day."; 
	}
	else if(start.value >= end.value){
		$('#alerttext').html('Invalid<strong> time</strong>.');
	}
	else if(!numvalidation(num.value)){
		$('#alerttext').html('Invalid<strong> input</strong>.');;
	}
};