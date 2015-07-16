//Code by: Eliot Carney-Seim
// References:	https://en.wikipedia.org/wiki/Conway's_Game_of_Life
// 				https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
//				http://www.w3schools.com/js/
//				http://d3js.org/
//				http://www.w3.org/TR/SVG/
//
// Kanye's Game of Life	   


var w = window.innerWidth/2,
    h = window.innerHeight/2,
    columns = 10,
    rows = 10,
    wRatio = w/columns,
    hRatio = h/rows,
    radius = Math.min(Math.floor(w/(2*columns)),Math.floor(h/(2*rows)));
	
var canvas = new BuildCanvas(rows,columns);
canvas.reset();
var svg = d3.select("body").append("svg:svg")
    .attr("width", w)
    .attr("height", h);
	
var circle = svg.selectAll("rect");

var autorun = false;
var ticks = 0;
var speed = 1000;

function PlayLoop(){
    console.log("Beginning Loop");
	
	canvas.step();
	ticks++;
    circle = circle.data(canvas.aliveCells(),function(d){return d.n});
    circle.enter().append("circle")
			.attr("cx", function(d){return d.x*hRatio + radius})
			.attr("cy", function(d){return d.y*hRatio + radius})
			.transition().duration(500)
				.attr("r", radius)
				.style("fill","#2ca02c");;

	circle.exit()
		.style("fill","#d62728")
		.transition().duration(500)
			.attr("r", 0)
		.remove();
	
	if(autorun){
		setTimeout(PlayLoop,speed);
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

