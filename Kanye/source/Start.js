//Code by: Eliot Carney-Seim
// References:	https://en.wikipedia.org/wiki/Conway's_Game_of_Life
// 				https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
//				http://www.w3schools.com/js/
//				http://d3js.org/
// Kanye's Game of Life	   



var w = window.innerWidth,
    h = window.innerHeight,
    columns = 30,
    rows = 30,
    wRatio = w/columns,
    hRatio = h/rows,
    radius = Math.min(Math.floor(w/(2*columns)),Math.floor(h/(2*rows)));
var canvas = new BuildCanvas(rows,columns);
canvas.reset();
var vis = d3.select("body").append("svg:svg")
    .attr("width", w)
    .attr("height", h);
var circle = vis.selectAll("circle");

function PlayLoop(){
	
    canvas.step();
	console.log("Looping!");
    circle = circle.data(canvas.aliveCells(),function(d){return d.n});
    circle.enter().append("image")
			.attr("xlink:href", "kanye.png")
            .attr("cx", function(d){return d.x*wRatio + radius})
            .attr("cy", function(d){return d.y*hRatio + radius})
            
    //circle.exit().remove();
    setTimeout(PlayLoop,2000);
}

PlayLoop();
