/// <reference path="./libraries/p5.d/p5.global-mode.d.ts" />

const WINDOW_W = 500;
const WINDOW_H = 500;
var nodeCount = 200;
var graph = [];
var currentNode = null;
var selectedNode = null;
var sourceNode = null;
var done = false;
var visitedCount = 0;
var speed = 1;
var slider;
var checkBox;
var drawEdges = true;


function setup() {
    createCanvas(WINDOW_W, WINDOW_H);

    slider = createSlider(1, 60, 1);
    slider.position(10, WINDOW_H + 10);
    slider.style('width', '80px');

    checkBox = createCheckbox('Draw all Edges', false);
    checkBox.position(100, WINDOW_H + 10)
    checkBox.checked(true);
    checkBox.changed(function() {
        drawEdges = checkBox.checked();
    });


    // generate random nodes
    for (let i = 0; i < nodeCount; i++) {
        graph.push(new Node(random(10, WINDOW_W - 10), random(10, WINDOW_H - 10)));
    }

    // randomaly connect nodes
    var count = 0;

    for (let node of graph) {
        count = 0;
        while (count != 2) {
            var option = graph[int(random(nodeCount))];

            if (option == node || node.isFriend(option)) {
                continue;
            }
            node.friends.push(option);
            option.friends.push(node);
            count++;
        }
    }

    // randomaly set source node
    sourceNode = graph[int(random(nodeCount))];
    sourceNode.dist = 0;
}


function dijkstra(currentNode) {
    var v;
    // find an unvisited friend of currentNode
    v = currentNode.getNextFriend();
    // if there is a friend to visit
    if (v != null) {
        // visit this friend
        visitFriend(v, currentNode);
    }
}

// visit a node from a node.
// v - currentNode
// u - friend of v
function visitFriend(v, u) {
    // calculate physical distance between 2 nodes
    const newDist = u.pos.dist(v.pos) + u.dist;
    // if new distance is smaller than the previous one
    if (newDist < v.dist) {
        // set new min dist, and previous node for shortest path
        v.dist = newDist;
        v.prev = u;
    }
}

// calculate the closest unvisited node from the source.
// return null if all visited.
function closestNode(graph) {
    var minDist = Infinity;
    var closest = null;
    for (let node of graph) {
        if (!node.visited) {
            if (node.dist < minDist) {
                minDist = node.dist;
                closest = node;
            }
        }
    }
    return closest;
}

// check if a node was clicked.
// if it is, select it, and show shortest path to it.
function mouseClicked() {
    if (done) {
        for (let node of graph) {
            if (node.inBounds(mouseX, mouseY)) {
                selectedNode = node;
                return;
            }
        }
        selectedNode = null;
    }
}

function draw() {
    speed = slider.value();
    if (!done) {
        let elapsedTime = millis();

        if (currentNode == null || currentNode.visited) {
            currentNode = closestNode(graph);
            if (currentNode == null) done = true;
        }

        if (elapsedTime % (1000 / speed) < 17 && !done) {
            dijkstra(currentNode);
        }
    }

    background(30)
    // check if a node is selected;
    // if it is, draw the shortest path to it.
    if (selectedNode != null) {
        selectedNode.recurse();
    }

    // draw all the  nodes and edges
    for (let node of graph) {
        node.Draw();
    }

    push();
    fill(0);
    rect(0,0, 150, 40);
    fill(240);
    textSize(10);
    var s = "Nodes Completed: " + visitedCount + "/" + nodeCount;
    text(s, 5, 15);
    s = "Time per visit: " + int(1000 / speed) + "ms";
    text(s, 5, 30);
    pop();
}
