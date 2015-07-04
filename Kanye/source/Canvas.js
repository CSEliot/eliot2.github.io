//The canvas
function BuildCanvas(rows, columns) {
    
    //Of course, the canvas in reality is just a 2 dimensional array.
    this.Canvas = new Array(rows);
    
    var number = 0;
    for(var x = 0; x < rows; x++){
        this.Canvas[x] = new Array(columns);
        
        //Create a frame container at each location.
        for(var y = 0; y < columns; y++){
            
            number = number + 1;
            var Frame = new BuildFrame(number, x, y);
            this.Canvas[x][y] = Frame;
        }
    }
}

BuildCanvas.prototype.aliveNeighborsFor = function(x, y) {
    var self = this,
        neighbors = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];

    function isAliveAt(i, j){
        if(i < 0 || i >= self.Canvas.length || j < 0 || j >= self.Canvas[0].length){
            return false;
        }
        return self.Canvas[i][j].isAlive;
    }

    var count = 0;
    for(var i = 0; i < neighbors.length; i++){
        count += (isAliveAt(x+neighbors[i][0],y+neighbors[i][1]))?1:0;
    }

    return count;
};

BuildCanvas.prototype.eachCell = function(callback){
    var rows = this.Canvas.length,
        columns = this.Canvas[0].length,
        x,y;
    for(var i = 0; i < rows * columns; i++){
        x = i%rows; y = Math.floor(i/rows);
        callback.apply(this,[this.Canvas[x][y],x,y]);
    }
};

BuildCanvas.prototype.reset = function(){
    this.eachCell(function(cell,x,y){
        cell.isAlive = (Math.random() > 0.5);
    });
};

BuildCanvas.prototype.prepareStep = function() {
    this.eachCell(function(cell,x,y){
        cell.computeNextState(this.aliveNeighborsFor(x,y));
    });
};

BuildCanvas.prototype.step = function() {
    this.prepareStep();
    this.eachCell(function(cell,x,y){
        cell.nextState();
    });
};

BuildCanvas.prototype.aliveCells = function() {
    var alive = [];
    this.eachCell(function(cell){
        cell.isAlive && alive.push(cell);
    });
    return alive;
};