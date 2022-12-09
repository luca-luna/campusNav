//https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance

let audio = new SpeechSynthesisUtterance();
audio.lang="en"
synth = window.speechSynthesis;

document.addEventListener("DOMContentLoaded", function () {
    $(document).ready(function() {

	$('#speak').on('click', function() {
		audio.text = document.getElementById('directions').textContent
		synth.speak(audio)
	});
	
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
	document.getElementById("speak").style.visibility="hidden";
	document.getElementById("dirAlert").style.visibility="hidden";
	document.getElementById("dirAlert").style.height="0px";

	
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

		var path_id = `${start[0]}-${end[0]}${type}`;
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
		    $("div.modal-body").html("<p>Use this help button to get text instructions once you have generated a path!</p>");
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

	//DEFINE TEXT INSTUCTIONS HERE AS VARIABLES (e.g. Davis to SU is one variable)
	$('.start-travel').click(function() {
		const label = document.getElementById('directions');
		var start = document.getElementById('start').value;
		var end = document.getElementById('end').value;

		document.getElementById("dirAlert").style.visibility="visible";
		document.getElementById("dirAlert").style.height="auto";
		document.getElementById("speak").style.visibility="visible";
		
		//DIRECT PATH DIRECTIONS
		if ($('input[name=type]:checked').val() == "direct") {
		    switch (start){
				case "cook":
					switch (end){
						case "jacobs":
							label.textContent = 'Head toward Capen Hall and keep going straight to O\'Brian Hall.\nKeep on the right side of the building.\nCross the street and you should arrive at Jacobs Management Center';
							break;
						case "su":
							label.textContent = 'Head toward Capen Hall and keep going straight to O\'Brian Hall.\nKeep on the left side of the building.\nKeep going straight and you should see the Student Union on your left.';
							break;
						case "davis":
							label.textContent = 'Head toward Capen Hall and turn left between Talbert Hall and Capen Hall and go down the stairs.\nTurn right and follow the sidewalk till you see Bonner hall and cross the street.\nDavis Hall should be right ahead';
							break;
					}
					break;
				case "jacobs":
					switch (end){
						case "cook":
							label.textContent = 'Exit Jacobs Management Center and cross the street.\nTurn to the left and walk straight past Capen Hall.\nCooke Hall is to your left.';
							break;
						case "su":
							label.textContent = 'Exit Jacobs Management Center and cross the street.\nGo between Baldy Hall and O\'Brian Hall.\nThe Student Union is to your right.';
							break;
						case "davis":
							label.textContent = 'Exit Jacobs Management Center and cross the street.\nGo between Baldy Hall and O\'Brian Hall and head down the stairs ahead.\nGo through the plaza and cross the street.\nDavis Hall should be right ahead.';
							break;
					}
					break;
				case "su":
					switch (end){
						case "cook":
							label.textContent = 'Exit the Student Union on the second floor.\nYou should see Lockwood Library and Baldy Hall in front of you.\nTurn left and head straight.\nKeep on the left and walk past Capen Hall.\nCooke Hall should be on your left.';
							break;
						case "jacobs":
							label.textContent = 'Exit the Student Union on the second floor.\nYou should see Lockwood Library and Baldy Hall in front of you.\nTurn right and head to Baldy Hall.\nGo between Baldy Hall and O\'Brian Hall and you should see Jacobs Management Center across the street.';
							break;
						case "davis":
							label.textContent = 'Exit the Student Union from the first floor.\nYou should see The Commons in front of you.\nTurn left and follow the sidewalk till you reach Bonner Hall. \nTurn right and cross the street.\nDavis Hall should be right ahead.';
							break;
					}
					break;
				case "davis":
					switch (end){
						case "cook":
							label.textContent = 'Exit the building and cross the street toward Bonner Hall.\nTurn right and follow the sidewalk till you pass Capen Hall and see a staircase.\nHead up the stair case and turn right after passing the overhead.\nCooke Hall is to your left.';
							break;
						case "jacobs":
							label.textContent = 'Exit the building and cross the street toward Bonner Hall.\nGo through the plaza and head up the stairs.\nGo between Baldy Hall and O\'Brian Hall and you should see Jacobs Management Center across the street.';
							break;
						case "su":
							label.textContent = 'Exit the building and cross the street toward Bonner Hall.\nTurn left and follow the sidewalk.\nStudent Union should be right ahead.';
							break;
					}
					break;
			}
		}

		//ACCESSIBLE PATH DIRECTIONS
		if ($('input[name=type]:checked').val() == "accessible-o") {
			switch (start){
				case "cook":
					switch (end){
						case "jacobs":
							label.textContent = 'Walk to Hochstetter Hall.\nExit the building by the entrance closest to Flint loop.\nGo straight along Mary Talbert Way heading towards Lockwood Library.\nCross the road to the other side of Mary Talber way and keep on going straight.\nJacobs should be right ahead.';
							break;
						case "su":
							label.textContent = 'Walk to Hochstetter Hall.\nExit the building by entrance closest to Flint loop.\nGo straight between O\'Brian Hall and Capen.\nKeep walking until you pass Student Union and reach Lee Road.\nTurn left on Lee Road.\nTurn right and Student Union is to your left.';
							break;
						case "davis":
							label.textContent = 'Walk to Hochstetter Hall.\nExit the building by entrance closest to Flint loop.\nGo straight between O\'Brian Hall and Capen.\nKeep walking until you pass Student Union and reach Lee road.\nTurn left and follow Lee road until you reach Bell Hall.\nGo straight pass Furnas Hall.\nTurn right and Davis should be straight ahead.';
							break;
					}
					break;
				case "jacobs":
					switch (end){
						case "cook":
							label.textContent = 'Exit the building to Mary Talbert way.\nTurn left and follow Mary Talbert way.\nCooke Hall should be straight ahead.';
							break;
						case "su":
							label.textContent = 'Exit the building to Mary Talbert way.\nTurn right, go straight until you pass Lockwood Library and reach Lee road.\nTurn left and follow Lee road.\nStudent Union is to your right.';
							break;
						case "davis":
							label.textContent = 'Exit the building to Mary Talbert way.\nTurn right, go straight until you pass Lockwood Library and reach Lee road.\nTurn left and follow Lee road until you reach Bell Hall.\nTurn right and go straight.\nDavis should be straight ahead.';
							break;
					}
					break;
				case "su":
					switch (end){
						case "cook":
							label.textContent = 'Exit the building by the entrace heading to The Commons.\nTurn right and follow Lee road until you reach Lockwood Library.\nTurn right and keep walking straight.\nCooke Hall should be straight ahead.';
							break;
						case "jacobs":
							label.textContent = 'Exit the building by the entrace heading to The Commons.\nTurn right and follow Lee road until you reach Lockwood Library.\nTurn right and Jacobs should be straight ahead.';
							break;
						case "davis":
							label.textContent = 'Exit the building by the entrance heading to The Commons.\nTurn left and follow Lee road until you pass Bell Hall.\nTurn right and Davis should be straight ahead.';
							break;
					}
					break;
				case "davis":
					switch (end){
						case "cook":
							label.textContent = 'Exit the building by the front entrance of Davis.\nGo straight to Mary Talbert way.\nTurn left and follow Lee road until you pass Student Union.\nTurn right and keep on going straight.\nCooke Hall should be right ahead.';
							break;
						case "jacobs":
							label.textContent = ' Exit the building by the front entrance of Davis.\nGo straight to Mary Talbert way.\nTurn left and follow Lee road until you pass Lockwood Library.\nTurn right to Mary Talbert way.\nJacobs should be straight ahead.';
							break;
						case "su":
							label.textContent = 'Exit the building by the front entrance of Davis.\nGo straight to Mary Talbert way.\nTurn left and follow Lee road until you reach Student Union.\nStudent Union should be to your right.';
							break;
					}
					break;
			}
		}
		console.log("DASDAS")
	    document.getElementById("gps").style.visibility="visible";

	    $('select').on('change', function() {
		synth.cancel();
		document.getElementById("gps").style.visibility="hidden";
		document.getElementById("start-travel").style.visibility="hidden";
		document.getElementById("dirAlert").style.visibility="hidden";
		document.getElementById("dirAlert").style.height=0;
		document.getElementById("speak").style.visibility="hidden";
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
		synth.cancel();
		document.getElementById("gps").style.visibility="hidden";
		document.getElementById("start-travel").style.visibility="hidden";
		document.getElementById("dirAlert").style.visibility="hidden";
		document.getElementById("dirAlert").style.height=0;
		document.getElementById("speak").style.visibility="hidden";
		    console.log(path);
		    (path != null) ? path.style.opacity = 0 : 1;
		    $("div.modal-body").html("<p>Use this help button to get text instructions once you have generated a path!</p>");
		});
	
    });
});


});

});
