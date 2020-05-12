/// <reference path="./libraries/p5.d/p5.global-mode.d.ts" />


function Node(x, y)
{
    this.pos = createVector(x, y);
    this.dist = Infinity;
    this.visited = false;
    this.friends = [];
    this.prev = null;
}

Node.prototype.Draw = function () {

    stroke(240);
    for(let f of this.friends)
    {
        if(f.prev == this)
        {
            stroke(240, 0, 0);
        }
        else{
            stroke(240);
        }
        line(this.pos.x, this.pos.y, f.pos.x, f.pos.y);
    }

    noStroke();
    fill(240);
    if(this == graph[0]) fill(240, 0, 0);
    ellipse(this.pos.x, this.pos.y, 12);
};

Node.prototype.isFriend = function (friend) {
    for(let f of this.friends)
    {
        if(f == friend)
        {
            return true;
        }
    }
    return false;
};
