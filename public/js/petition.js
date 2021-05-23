$(document).ready(function(){
//-------------------------Functions for When The User Owns the Petition---------------------------------
	//Clicking the edit button in the days row
	$("#edit-days").click(function(){
		$(`#edit-days-form`).attr("class","bg-light d-inline");

		var daysString = $("#desc-days").text();
		var days = daysString.split(" ");
		var numChecked = 0;

		for(var i = 0; i < days.length; i++){
			$("#"+days[i]).prop("checked",true);
		}
	})


	//Cancel Edit Days Button
	$("#cancel-edit-days").click(function(){
		var timeForm = $("#edit-days-form");
		$(timeForm).attr("class","bg-light d-none");
	})

	//Confirm Edit Days BUtton
	$("#confirm-edit-days").click(function(){
		var numChecked = $(".checkboxes input:checked").length;

		var checkedDays = [];
		$(".checkboxes input[type=checkbox]").each(function(){
			if($(this).is(":checked")){
				checkedDays.push($(this).attr("value"));
			}
		});

		if(numChecked > 2){
			alert("Maximum of 2 days only!");
		}
		else if (numChecked == 0){
			alert("Please select at least 1 day!");
		}
		else{
			var curDays = $("#desc-days").text().split(" ");

			if(curDays[0] == ""){
				curDays.shift();
			}
			else if(curDays[1] == ""){
				curDays.pop();
			}

			if(JSON.stringify(checkedDays) == JSON.stringify(curDays)){
				alert("Selected days are the same as the petition's current days. Please change your selection.");
			}
			else{
				var confirmDays = confirm("Are you sure to edit your course's days? Editing this will update your petition but remove all of its signatures.");
				var petitionId = $("#petition-id").text();

				if(confirmDays){
					$.get(`/editDays`, {checkedDays : checkedDays, petitionid: petitionId}, function(result){

						alert("Update successfully done");
						var URL = window.location.href;
						$('#desc-days').load(URL + ' #desc-days');
					});

				}

			}
		}
	})

	//Edit Time Slot Button Click
	$("#edit-time").click(function()
	{
		$("#edit-time-form").attr("class","bg-light d-inline");

		var timeSlots = $("#desc-time").text().split("-");

		$("#edit-start-time").val(timeSlots[0]);
		$("#edit-end-time").val(timeSlots[1]);

	})

	//Cancel Edit Time Slot Button Blick
	$("#cancel-edit-time").click(function(){
		var timeForm = $("#edit-time-form");
		$(timeForm).attr("class","bg-light d-none");
	})

	//Confirm button for editing time slot
	$("#confirm-edit-time").click(function(){

		var startTime = $("#start-time").val();
		var endTime = $("#end-time").val();	
		if(startTime == "" || endTime == "")
		{
			alert("An input field is empty. Please fill up that field");
		}
		else
		{
			var timeSlots = $("#desc-time").text().split("-");

			var editStartTime = $("#edit-start-time").val();
			var editEndTime = $("#edit-end-time").val();

			var petitionId = $("#petition-id").text();

			if(editStartTime == timeSlots[0] && editEndTime == timeSlots[1]){
				alert("Selected time slot is the same as petition's current time slot. Please change your selection.");
			}
			else{
				var confirmation = confirm("Are you sure to edit your course's time slot? Editing this will update your petition but remove all of its signatures.");
				if(confirmation == true)
				{
					$.get(`/editTimeSlot`, {startTime : editStartTime, endTime: editEndTime, petitionid: petitionId}, function(result){

						alert("Update successfully done");
						var URL = window.location.href;
						$('#desc-time').load(URL + ' #desc-time');
					});
				}
			}
		}
		
	})

	//Function for delete button
	$("#delete-petition").click(function(){
		var confirmDelete = confirm("Are you sure to delete this petition? Signatures and comments will be removed.");

		if(confirmDelete == true){
			alert("Deleted");
			//Insert delete petition
		}
	})

//-----------------------------------------------------------------------------------------------------------------

//------------------Functions for When The User Does not Own the Petition-----------------------------------------

	$(".col.align-self-center").on("click", ".sign-petition", function(){
		var confirmation = confirm("Are you sure to sign this petition?");

		if(confirmation == true){

			var petitionId = $("#petition-id").text();
			var curUserName = $("#curuser-username").text();

			$.get(`/signPetition`, {petitionid: petitionId, curusername: curUserName}, function(result){

						alert("You have successfully signed");
						var URL = window.location.href;
						$('#petition-progress').load(URL + ' #petition-progress');
						$('#signee-list').load(URL + ' #signee-list');
					});

			$(this).attr("class", "btn btn-secondary btn-block my-3");
			$(this).text("Unsign Petition");
			$(this).removeClass("sign-petition").addClass("unsign-petition");

		}
	})

	$(".col.align-self-center").on("click", ".unsign-petition", function(){

		var confirmation = confirm("Are you sure to unsign this petition?");

		if(confirmation == true){

			var petitionId = $("#petition-id").text();
			var curUserName = $("#curuser-username").text();

			$.get(`/unsignPetition`, {petitionid: petitionId, curusername: curUserName}, function(result){
				alert("You have successfully unsigned");
				var URL = window.location.href;
				$('#petition-progress').load(URL + ' #petition-progress');
				$('#signee-list').load(URL + ' #signee-list');
			});

			$(this).attr("class", "btn btn-primary btn-block my-3");
			$(this).text("Sign Petition");
			$(this).removeClass("unsign-petition").addClass("sign-petition");
		}


	});





//--------------------------------------------------------------------

	// submits the button
	$("#submit-comment").click(function(){

		/*
	        <div class="d-flex flex-row p-3" id="comment-1"> <img src="images/avatar.png" width="40" height="40" class="rounded-circle me-3" >
	            <div class="w-100">
	                <div class="d-flex justify-content-between align-items-center">
	                    <div class="d-flex flex-row align-items-center"> <span class="me-2">John Smith</span>  </div> <small>12h ago</small>
	                </div>
	                <p class="text-justify comment-text mb-0">I really need this to finish my GE courses</p>
	                <div class="d-flex flex-row user-feed"> <span class="ms-3"><i class="fa fa-comments-o me-2"></i>Reply</span> </div>
	            </div>
	        </div>
        */
        //For comment, If commenter of the comment is user currently logged in, then the display is shown. Otherwise, the display is hidden
        if($("#comment-content").val()){
        	/*
        	//Gets number of comments and sets the id of the comment currently being made;
        	var numComments =  $("#comment-section .d-flex.flex-row.p-3").length;
        	var commentId = "comment-" + (numComments + 1);

			var mainComment = document.createElement("div");
			$(mainComment).attr("class", "d-flex flex-row p-3");
			$(mainComment).attr("id", commentId);

			//Image of comment
			var userImage = document.createElement("img");
			$(userImage).attr("src","images/avatar.png");
			$(userImage).attr("width","40");
			$(userImage).attr("height","40");
			$(userImage).attr("class","rounded-circle me-3");
			$(mainComment).append(userImage);

			// container of the comment and its components
			var widthDiv = document.createElement("div");
			$(widthDiv).attr("class","w-100");


			// <div class="d-flex justify-content-between align-items-center">
			var alignDiv = document.createElement("div");
			$(alignDiv).attr("class", "d-flex justify-content-between align-items-center");


			//<div class="d-flex flex-row align-items-center"> </div>
			var nameDiv = document.createElement("div");
			$(nameDiv).attr("class", "d-flex flex-row align-items-center");

			//<span class="me-2">
			var nameSpan = document.createElement("span");
			$(nameSpan).attr("class","me-2");
			$(nameSpan).text("John Smith");
			$(nameDiv).append(nameSpan);
			$(alignDiv).append(nameDiv);

			//<small></small>
			//Date of comment
			var commentDate = document.createElement("small");
			var today = new Date();
			var formattedDate = today.getFullYear().toString() + '-' + (today.getMonth() + 1).toString().padStart(2, 0) + '-' + today.getDate().toString().padStart(2, 0);

			$(commentDate).text(formattedDate);
			$(alignDiv).append(commentDate);

			//appends  Name and Date to comment container widthDiv
			$(widthDiv).append(alignDiv);

			var commentContent = document.createElement("p");
			$(commentContent).attr("class","text-justify comment-text mb-0");
			$(commentContent).text($("#comment-content").val());

			$(widthDiv).append(commentContent);


			var buttonsDiv = document.createElement("div");
			$(buttonsDiv).attr("class","d-flex flex-row user-feed");
				var buttonSpan = document.createElement("span");
				$(buttonSpan).attr("class","ms-3");
				$(buttonSpan).html('<i class="fa fa-comments-o me-2"></i>Reply');
				$(buttonsDiv).append(buttonSpan);

			$(widthDiv).append(buttonsDiv);
			$(mainComment).append(widthDiv);

			$("#comment-section").append(mainComment);
			*/

			var today = new Date();
			var formattedDate = today.getFullYear().toString() + '-' + (today.getMonth() + 1).toString().padStart(2, 0) + '-' + today.getDate().toString().padStart(2, 0);

			var commentContent = $("#comment-content").val();
			var firstName =  $("#curuser-first").text();
			var lastName = $("#curuser-last").text();
			var petitionId = $("#petition-id").text();
			var curUsername = $("#curuser-username").text();


			$.get(`/getComment`, 
				{commentcontent: commentContent, 
				firstname: firstName, 
				lastname: lastName, 
				petitionid: petitionId, 
				curusername: curUsername, 
				date: formattedDate},  function(result){
					var URL = window.location.href;
					$('#comment-section').load(URL + ' #comment-section');

					$("#comment-content").val("");
			});


		}
		else{
			alert("Please enter a comment!");
		}
	})

	//Reply Button Click
	$("#comment-section").on('click', '.reply-button',function(){

		alert("You clicked on the reply button! COmment content is: " + $("#comment-content").val());

		$("#comment-content").focus();
		$("#comment-content").val("@" + "Hello");

	});

	$(".reply-button").hover(function(){

		$(this).attr("class", "ms-3 reply-button text-secondary");
		$(this).css("cursor","pointer");
	}, function(){
		$(this).attr("class", "ms-3 reply-button");
		$(this).css("cursor","default");
	});

	$(".delete-button").hover(function(){

		$(this).attr("class", "ms-3 delete-button text-secondary");
		$(this).css("cursor","pointer");
	}, function(){
		$(this).attr("class", "ms-3 delete-button");
		$(this).css("cursor","default");
	});
});
