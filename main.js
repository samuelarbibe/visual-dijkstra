/// <reference path="./libraries/p5.d/p5.global-mode.d.ts" />

const WINDOW_W = 500;
const WINDOW_H = 500;
var nodeCount = 10;
var graph = [];

function setup() {
    createCanvas(WINDOW_W, WINDOW_H);

    // generate random node
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

    var source = graph[0];
    dijkstra(graph, source);
}

function dijkstra(graph, source) {

	source.dist = 0;
    var u;

    while ((u = closestNode(graph)) != null) {
		// set current node as visited
		u.visited = true;
        for (let v of u.friends) {
            if (!v.visited) {
                // calculate physical dist between 2 edges
                const newDist = u.pos.dist(v.pos) + u.dist;
                // if new dist is smaller than the previous one
                if (newDist < v.dist) {
                    v.dist = newDist;
                    v.prev = u;
                }
            }
        }
    }
}

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

function draw() {
    background(30)

    for (let node of graph) {
        node.Draw();
    }
}
