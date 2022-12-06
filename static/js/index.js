document.addEventListener("DOMContentLoaded", function () {
    $(document).ready(function() {
	var svg = document.getElementById('map');    
	var svgDoc = svg.contentDocument;

	// color start and end buildings before route generation
	$('select').on('change', function() {
	    let new_building = svgDoc.getElementById(this.value);
	    let previous = svgDoc.getElementById(this.data);

	    (this.id == "start") ? new_building.style.fill = "rgba(220, 53, 69, 0.5)" : new_building.style.fill = "rgba(25, 135, 84, 0.5)";
	    (previous != null) ? previous.style.fill = "none" : 1;

	    this.data = this.value;
	});

	//generate route
	$('.nav-btn').click(function() {

	    try {	
		let start = $('#start').val();
		let end = $('#end').val();

		let path = svgDoc.getElementById(`${start[0]}-${end[0]}`);
		(path == null) ? path = svgDoc.getElementById(`${end[0]}-${start[0]}`) : 1;
		(path != null) ? path.style.opacity = 1 : 1;

		// color start and end buildings after route generation
		svgDoc.getElementById(start).style.fill = "rgba(220, 53, 69, 0.5)";
		svgDoc.getElementById(end).style.fill = "rgba(25, 135, 84, 0.5)";

		document.getElementById("putBtnHere").innerHTML = '<button type="button" class="btn btn-success start-travel">Start Travel</button>'

		$('select').on('change', function() {
		    (path != null) ? path.style.opacity = 0 : 1;
		    
		    let building = svgDoc.getElementById(this.value);
		    let previous = svgDoc.getElementById(this.data);
		    previous.style.fill = "none";
		    (this.id == "start") ? building.style.fill = "rgba(220, 53, 69, 0.5)" : building.style.fill = "rgba(25, 135, 84, 0.5)";

		    this.data = this.value;

			document.getElementById("putBtnHere").innerHTML = '<button type="button" class="btn btn-success nav-btn">Begin Navigation </button>'
			

		});

	    }
	    catch {
		alert("Please select start and end locations");
	    }
	    
	});
	
    });
});
