/// <reference path="./libraries/p5.d/p5.global-mode.d.ts" />

function Vertex(target, dist)
{
    this.target = target;
    this.dist = dist;
    this.prev = undefined;
    this.visited = false;
}
