$(document).ready(function () {

	$("#thisModal").modal('show');

	var days = false;

	function isFilled() {

        var coursecode = validator.trim($('#coursecode').val());
        var starttime = validator.trim($('#starttime').val());
        var endtime = validator.trim($('#endtime').val());
	    var numstudents = validator.trim($('#numstudents').val());

        var coursecodeEmpty = validator.isEmpty(coursecode);
        var starttimeEmpty = validator.isEmpty(starttime);
        var endtimeEmpty = validator.isEmpty(endtime);
	    var numstudentsEmpty = validator.isEmpty(numstudents);

	    return !coursecodeEmpty && !starttimeEmpty && !numstudentsEmpty;
    }
	 
	$('#coursecode').keyup(function(){
	    $(this).val($(this).val().toUpperCase());
	});


	$('.checkbox input[type=checkbox]').on('change', function (e) {
		var filled = isFilled();
	    if ($('input[type=checkbox]:checked').length > 2) {
	        $(this).prop('checked', false);
	        $('#alerttext').html('Maxinum of <strong>two</strong> days only.');
	    }
	    else if ($('input[type=checkbox]:checked').length === 0){
	    	$('#alerttext').html('Select at least <strong>one</strong> day.');
	    }
	    else{
	    	$('#alerttext').html('This is an <strong>alert</strong>. This is to show alert messages to the user.');
	    	days = true;
	    }
	});

	function isvalidTime(field) {

        var timevalidity = false;

        var starttime = validator.trim($('#starttime').val());
        var endtime = validator.trim($('#endtime').val());

        if(starttime < endtime) {
			timevalidity = true;
			return timevalidity;
        } else {
            return timevalidity;   	
        }
        return timevalidity;
         
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

        var validTime = isvalidTime();

        console.log(`1 `+filled);
        console.log(`2 `+validTime);
        console.log(`3 `+days);
        
        if(filled && validTime && days)
            $('#button').prop('disabled', false);

        else
            $('#button').prop('disabled', true);
    }

    $('#coursecode').keyup(function () {
        validateField($('#coursecode'), 'Course Code');
    });

    $('#starttime').change(function () {
        validateField($('#starttime'), 'Start Time');
    });

    $('#endtime').change(function () {
        validateField($('#endtime'), 'End Time');
    });

    $('#numstudents').keyup(function () {
        validateField($('#numstudents'), 'Number of Students');
    });
});

// var button = document.getElementById("button");

// function numvalidation(num) {
// 	var regex = /^[0-9]{1,4}$/;		
// 	return regex.test(num);
// };

// function codevalidation(code) {
// 	var regex = /^[a-zA-Z0-9_]{2,20}$/;
// 	return regex.test(code)
// };

// button.onclick = function() {
// 	var code = document.getElementById("course-code");
// 	var start = document.getElementById("start-time");
// 	var end = document.getElementById("end-time");
// 	var num = document.getElementById("num-students");

// 	$('#alerttext').html('This is an <strong>alert</strong>. This is to show alert messages to the user.');

// 	if(!codevalidation(code.value)){
// 		$('#alerttext').html('Invalid<strong> course code</strong>.');
// 	}
// 	else if ($('input[type=checkbox]:checked').length === 0){
// 		$('#alerttext').html('Select at least <strong> one</strong> day.');
//         document.getElementById("errordays").innerHTML = " Select at least one day."; 
// 	}
// 	else if(start.value >= end.value){
// 		$('#alerttext').html('Invalid<strong> time</strong>.');
// 	}
// 	else if(!numvalidation(num.value)){
// 		$('#alerttext').html('Invalid<strong> input</strong>.');;
// 	}
// };