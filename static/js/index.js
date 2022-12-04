$(document).ready(function() {
    var svg = document.getElementById('map');    
    var svgDoc = svg.contentDocument;

    // color start and end buildings before route generation
    $('select').on('change', function() {
	let new_building = svgDoc.getElementById(this.value);
	let previous = svgDoc.getElementById(this.data);

	(this.id == "start") ? new_building.style.fill = "red" : new_building.style.fill = "green";
	(previous != null) ? previous.style.fill = "none" : 1;

	this.data = this.value;
    });

    //generate route
    $('.btn').click(function() {

	try {	
	    let start = $('#start').val();
	    let end = $('#end').val();

	    let path = svgDoc.getElementById(`${start[0]}-${end[0]}`);
	    (path == null) ? path = svgDoc.getElementById(`${end[0]}-${start[0]}`) : 1;
	    (path != null) ? path.style.opacity = 1 : 1;

	    // color start and end buildings after route generation
	    svgDoc.getElementById(start).style.fill = "red";
	    svgDoc.getElementById(end).style.fill = "green";

	    $('select').on('change', function() {
		(path != null) ? path.style.opacity = 0 : 1;
		
		let building = svgDoc.getElementById(this.value);
		let previous = svgDoc.getElementById(this.data);
		previous.style.fill = "none";
		(this.id == "start") ? building.style.fill = "red" : building.style.fill = "green";

		this.data = this.value;
	    });

	}
	catch {
	    alert("Please select start and end locations");
	}
	
    });
    
});
