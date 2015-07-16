function BuildFrame(status) {
    //Each frame starts dead. Later on they get filled with Kanye's
    this.isAlive = status;
    this.willBeAlive = false;
}

BuildFrame.prototype.computeNextState = function(aliveNeighborsCount) {
    if(aliveNeighborsCount == 3){
        this.willBeAlive = true;
    } else if(aliveNeighborsCount > 3 || aliveNeighborsCount < 2) {
        this.willBeAlive = false;
    } else {
        this.willBeAlive = this.isAlive;
    }

    return this.willBeAlive;
};

BuildFrame.prototype.nextState = function(){
    this.isAlive = this.willBeAlive;
}