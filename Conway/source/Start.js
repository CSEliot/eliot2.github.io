//Code by: Eliot Carney-Seim
// References:	https://en.wikipedia.org/wiki/Conway's_Game_of_Life
// 				https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
//				http://www.w3schools.com/js/
//				http://d3js.org/
//				http://www.w3.org/TR/SVG/
//
// Conway's Game of Life
// This file launches the game and gatheres parameters for D3. Also handles html button code. 



var w = window.innerWidth/2,
    h = window.innerHeight/2
//to get a fitting square we get the smaller of the two:
if(h > w){h = w;}else{w = h;}	
 
var columns = 30, 
    rows = 30,
    wRatio = w/columns,
    hRatio = h/rows;
	//To fit on any size screen we get a ratio for each square.
	

var MyCanvas = new Canvas(rows,columns);
MyCanvas.start();

var svg = d3.select("body").append("svg:svg")
	.attr("width", w)
	.attr("height", h);

var frames = svg.selectAll("rect");

var autorun = false,
	ticks = 0,
	speed = 1000
	frameGapModifier = 0.9;


function PlayLoop(){
	MyCanvas.next();
	
	ticks++;
	
	frames = frames.data(MyCanvas.allLivingFrames(),function(d){return d.frameNumber});
	frames.enter().append("rect")
			.attr("x", function(d){return d.x*wRatio})
			.attr("y", function(d){return d.y*hRatio})
			.transition().duration(500)
				.attr("width", wRatio * frameGapModifier)
				.attr("height", hRatio * frameGapModifier)
				.style("fill","white");;

	frames.exit()
		.style("fill","grey");

	if(autorun){
		setTimeout(PlayLoop,2000+speed);
	}
	$("label#Ticks").html(ticks);
	speed = $("input#Speed").val() * 1000;
}
PlayLoop();

function ToggleAutorun(){
	console.log("Toggling Autorun: " + autorun);
	autorun = !autorun;
	if(autorun){
		PlayLoop(autorun);
	}
}

function Step(){
	autorun = false;
	PlayLoop(autorun);
}
