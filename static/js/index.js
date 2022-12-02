function clearBuildings(svgDoc) {
    svgDocsvgDoc.getElementById('davis').style.fill = 'none';
    svgDocsvgDoc.getElementById('cook').style.fill = 'none';
    svgDocsvgDoc.getElementById('jacobs').style.fill = 'none';
    svgDocsvgDoc.getElementById('su').style.fill = 'none';
}


$(document).ready(function() {
    let svg = document.getElementById('map');
    console.log(svg);

    svg.addEventListener("load", function () {
	alert("hi");
	console.log("HIII");
    });
    
    let svgDoc = svg.contentDocument;

    let davis = svgDoc.getElementById("davis");
    davis.style.stroke = "black";

    let jacobs = svgDoc.getElementById("jacobs");
    jacobs.style.stroke = "black";

    let su = svgDoc.getElementById("su");
    su.style.stroke = "black";

    let cook = svgDoc.getElementById("cook");
    cook.style.stroke = "black";
    
    $('select').on('change', function() {
	let building = svgDoc.getElementById(this.value);
	let previous = svgDoc.getElementById(this.data);

	(this.id == "start") ? building.style.fill = "red" : building.style.fill = "green";
	(previous != null) ? previous.style.fill = "none" : 1;

	this.data = this.value;
    });


    $('.btn').click(function() {
	let start = $('#start').val();
	let end = $('#end').val();
	console.log(start);
	console.log(end);

	// color path
	let path = svgDoc.getElementById(`${start[0]}-${end[0]}`);
	(path == null) ? path = svgDoc.getElementById(`${end[0]}-${start[0]}`) : 1;
	path.style.opacity = 1;

	// color start and end buildings
	svgDoc.getElementById(start).style.fill = "red";
	svgDoc.getElementById(end).style.fill = "green";

	$('select').on('change', function() {
	    path.style.opacity = 0;
	    
	    //let building = svgDoc.getElementById(this.value);
	    //let previous = svgDoc.getElementById(this.data);
	    //previous.style.fill = "none";
	    //(this.id == "start") ? building.style.fill = "red" : building.style.fill = "green";
	});
	
    });
    
});
