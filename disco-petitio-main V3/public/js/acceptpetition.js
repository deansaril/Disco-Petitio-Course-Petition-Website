$(document).ready(function () {

    // $("#myModal").modal('show');
    $('#cards').on('click', '.approve', function () {
        var petitionid = $(this).val();
        var URL = window.location.href;

        // console.log("The current petitionid is " + petitionid);
          
        $.get('/getAcceptpetition', {petitionid: petitionid}, function (result) {
            $('#cards').load(URL + ' #cards');
            // console.log(result);
        });
    });
    $('#cards').on('click', '.disapprove', function () {
        var petitionid = $(this).val();
        var URL = window.location.href;

        // console.log("The current petitionid is " + petitionid);
          
        $.get('/getRejectpetition', {petitionid: petitionid}, function (result) {
            $('#cards').load(URL + ' #cards');
            // console.log(result);
        });
    }); 
    $('#cards').on('click', '.pending', function () {
        var petitionid = $(this).val();
        var URL = window.location.href;

        // console.log("The current petitionid is " + petitionid);
          
        $.get('/getPendingpetition', {petitionid: petitionid}, function (result) {
            $('#cards').load(URL + ' #cards');
            // console.log(result);
        });
    });    
});
