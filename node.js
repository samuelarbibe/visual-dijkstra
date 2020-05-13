/// <reference path="./libraries/p5.d/p5.global-mode.d.ts" />


function Node(x, y) {
    this.pos = createVector(x, y);
    this.dist = Infinity;
    this.visited = false;
    this.friends = [];
    this.prev = null;
    this.friendIndex = 0;
}

// returns the next unvisited friend.
// if all friends have been visited, return null.
Node.prototype.getNextFriend = function() {
    var f;
    for (var i = this.friendIndex; i < this.friends.length; i++) {
        this.friendIndex++;
        if ((f = this.friends[i]).visited == false) {
            return f;
        }
    }
    // if we get here, it means that there are no unvisited friends.
    // set this node as visited.
    this.visited = true;
    visitedCount++;
    return null;
};

Node.prototype.Draw = function() {

    for (let f of this.friends) {
        strokeWeight(1);
        stroke(100);
        // draw min distance edge
        if (selectedNode != null) {
            line(this.pos.x, this.pos.y, f.pos.x, f.pos.y);
        }
        else if (f.prev == this || this.prev == f) {
            stroke(240, 0, 0);
            strokeWeight(2);
            line(this.pos.x, this.pos.y, f.pos.x, f.pos.y);
        }
        // draw current visited edge
        else if (this == currentNode && this.friendIndex < this.friends.length && f == this.friends[this.friendIndex]) {
            stroke(0, 0, 240);
            strokeWeight(2);
            line(this.pos.x, this.pos.y, f.pos.x, f.pos.y);
        }
        // draw the rest
        else if (drawEdges) {
            line(this.pos.x, this.pos.y, f.pos.x, f.pos.y);
        }

    }

    noStroke();
    fill(240);
    // draw source node in red
    if (this == sourceNode) fill(240, 0, 0);
    // draw current node in green
    else if (this == currentNode) fill(0, 240, 0);
    // draw visited node in blue
    else if (this.visited) fill(0, 0, 240);
    ellipse(this.pos.x, this.pos.y, 10);
};

Node.prototype.isFriend = function(friend) {
    for (let f of this.friends) {
        if (f == friend) {
            return true;
        }
    }
    return false;
};

Node.prototype.inBounds = function(x, y) {

    if (abs(this.pos.x - x) < 10 && abs(this.pos.y - y) < 10) {
        return true;
    }
    return false;
};

Node.prototype.recurse = function() {
    console.log("hello");
    if (this.prev == null) return;
    this.prev.recurse();

    push();
    stroke(240, 0, 0);
    strokeWeight(5);
    line(this.pos.x, this.pos.y, this.prev.pos.x, this.prev.pos.y);

    pop();
};
