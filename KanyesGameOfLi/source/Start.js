var w = window.innerWidth,
    h = window.innerHeight,
    columns = 10,
    rows = 10,
    wRatio = w/columns,
    hRatio = h/rows,
    radius = Math.min(Math.floor(w/(2*columns)),Math.floor(h/(2*rows)));
var grid = new BuildCanvas(rows,columns);
grid.reset();
var svg = d3.select("body").append("svg:svg")
    .attr("width", w)
    .attr("height", h);
var circle = svg.selectAll("circle");
(function(){
    grid.step();
    circle = circle.data(grid.aliveCells(),function(d){return d.n});
    circle.enter().append("circle")
            .attr("cx", function(d){return d.x*wRatio + radius})
            .attr("cy", function(d){return d.y*hRatio + radius})
            .transition().duration(500)
                .attr("r", radius)
                .style("fill","#2ca02c");;
    circle.exit()
        .style("fill","#000000")
        .transition().duration(500)
            .attr("r", 0)
        .remove();
    setTimeout(arguments.callee,3000);
})();
