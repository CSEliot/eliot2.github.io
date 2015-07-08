//Code by: Eliot Carney-Seim
// References:	https://en.wikipedia.org/wiki/Conway's_Game_of_Life
// 				https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide
//				http://www.w3schools.com/js/
//				http://d3js.org/
//				http://www.w3.org/TR/SVG/
//
// Kanye's Game of Life	   



var w = window.innerWidth,
    h = window.innerHeight,
    columns = 30,
    rows = 30,
    wRatio = w/columns,
    hRatio = h/rows,
    radius = Math.min(Math.floor(w/(columns)),Math.floor(h/(rows)));
var canvas = new BuildCanvas(rows,columns);
canvas.reset();
var svg = d3.select("body").append("svg:svg")
    .attr("width", w)
    .attr("height", h);
var circle = svg.selectAll("circle");
function PlayLoop(){
    console.log("Beginning Loop");
	
	canvas.step();
	
    circle = circle.data(canvas.aliveCells(),function(d){return d.n});
    circle.enter().append("rect")
			.style("fill","url(#kanye)")
            .attr("x", function(d){return d.x*wRatio})
            .attr("y", function(d){return d.y*hRatio})
			.transition().duration(1000)
				.attr("width", radius)
				.attr("height", radius)
    circle.exit()
        .transition().duration(1000)
            .attr("width", 0)
			.attr("height", 0)
        .remove();
    setTimeout(PlayLoop,3000);
}
PlayLoop();
