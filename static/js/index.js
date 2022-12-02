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
	
	if (previous != null) {
	    previous.style.fill = "none";
	}

	    this.data = this.value;
    });
    
});
