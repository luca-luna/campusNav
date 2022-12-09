document.addEventListener("DOMContentLoaded", function () {
    $(document).ready(function() {
	
	$(function() {  
	    $( "#dialg" ).dialog({  
		autoOpen: false,
		draggable: true,
	    });  
	    $( "#opener" ).click(function() {  
		$( "#dialg" ).dialog( "open" );  
	    });  
	});
	
	var svg = document.getElementById('map');
	addEventListener("load", (event) => {
	    console.log("svg loaded");
	
	var svgDoc = svg.contentDocument;

	document.getElementById("start-travel").style.visibility="hidden";
	document.getElementById("gps").style.visibility="hidden";

	
	// color start and end buildings before route generation
	$('select').on('change', function() {
	    let new_building = svgDoc.getElementById(this.value);
	    let previous = svgDoc.getElementById(this.data);

	    (this.id == "start") ? new_building.style.fill = "rgba(220, 53, 69, 0.5)" : new_building.style.fill = "rgba(25, 135, 84, 0.5)";
	    (previous != null) ? previous.style.fill = "none" : 1;

	    this.data = this.value;

		document.getElementById("start-travel").style.visibility="hidden";

	});

	//generate route
	$('.nav-btn').click(function() {

	    try {	
		let start = $('#start').val();
		let end = $('#end').val();

		if ($('input[name=type]:checked').val() == "direct") {
		    type = "-d";
		}
		else if ($('input[name=type]:checked').val() == "accessible-o") {
		    type = "";
		}
		else if ($('input[name=type]:checked').val() == "accessible-e") {
		    type = "-e";
		}

		var path_id = "";
		var path = svgDoc.getElementById(`${start[0]}-${end[0]}${type}`);
		console.log(path);
		(path == null) ? (path = svgDoc.getElementById(`${end[0]}-${start[0]}${type}`), path_id = `${end[0]}-${start[0]}${type}`) : path_id = `${start[0]}-${end[0]}${type}`;
		(path != null) ? path.style.opacity = 1 : 1;

		// color start and end buildings after route generation
		svgDoc.getElementById(start).style.fill = "rgba(220, 53, 69, 0.5)";
		svgDoc.getElementById(end).style.fill = "rgba(25, 135, 84, 0.5)";

		document.getElementById("start-travel").style.visibility="visible";

		$('select').on('change', function() {
		    (path != null) ? path.style.opacity = 0 : 1;
		    
		    let building = svgDoc.getElementById(this.value);
		    let previous = svgDoc.getElementById(this.data);
		    previous.style.fill = "none";
		    (this.id == "start") ? building.style.fill = "rgba(220, 53, 69, 0.5)" : building.style.fill = "rgba(25, 135, 84, 0.5)";

		    this.data = this.value;

		    document.getElementById("start-travel").style.visibility="hidden";
		    $("div.modal-body").html("<p>Use this help button to get text instructions once you have generated a path!</p>");
		});

		$('input[name=type]').on('change', function() {
		    console.log(path);
		    (path != null) ? path.style.opacity = 0 : 1;
		    $("div.modal-body").html("<p>Use this help button to get text instructions once you have generated a path!</p>");
		});

		switch (path_id) {
		case "d-s":
		    $("div.modal-body").html("<p>Exit the building and cross the street toward Bonner Hall.Turn left and follow the sidewalk. Student Union should be right ahead.</p>");
		    break;
		case "d-j":
		    $("div.modal-body").html("<p>Exit the building and cross the street toward Bonner Hall. Go through the plaza and head up the stairs. Go between Baldy Hall and O'Brian Hall and you should see Jacobs Management Center across the street.</p>");
		    break;
		case "d-c":
		    $("div.modal-body").html("<p>Exit the building and cross the street toward Bonner Hall. Turn right and follow the sidewalk till you pass Capen Hall and see a staircase. Head up the stair case and turn right after passing the overhead. Cooke Hall is to your left. </p>");
		    break;
		case "j-c":
		    $("div.modal-body").html("<p>Exit Jacobs Management Center and cross the street. Turn to the left and walk straight past Capen Hall. Cooke Hall is to your left. </p>");
		    break;
		case "s-c":
		    $("div.modal-body").html("<p>Exit the Student Union on the second floor. You should see Lockwood Library and Baldy Hall in front of you. Turn left and head straight. Keep on the left and walk past Capen Hall. Cooke Hall should be on your left. </p>");
		    break;
		case "s-j":
		    $("div.modal-body").html("<p>Exit the Student Union on the second floor. You should see Lockwood Library and Baldy Hall in front of you.Turn right and head to Baldy Hall. Go between Baldy Hall and O'Brian Hall and you should see Jacobs Management Center across the street. </p>");
		break;
		default:
		    $("div.modal-body").html("not found");
		    break;
			
		};

	    }
	    catch {
		alert("Please select start and end locations as well as path type");
	    }
	    
	});

	$('.start-travel').click(function() {
		document.getElementById("gps").style.visibility="visible";
	});
	});
	
    });
});




