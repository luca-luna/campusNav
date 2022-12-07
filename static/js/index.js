document.addEventListener("DOMContentLoaded", function () {
    $(document).ready(function() {



	/*$(function () {
            $("#myModal").dialog({
		modal: true,
		autoOpen: false,
		title: "jQuery Dialog",
		width: 300,
		height: 150
            });
            $("#help").click(function () {
		$('#myModal').dialog('open');
            });
	});*/



	
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

		var path = svgDoc.getElementById(`${start[0]}-${end[0]}${type}`);
		console.log(path);
		(path == null) ? path = svgDoc.getElementById(`${end[0]}-${start[0]}${type}`) : 1;
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
		});

		$('input[name=type]').on('change', function() {
		    console.log(path);
		    (path != null) ? path.style.opacity = 0 : 1;
		});

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




