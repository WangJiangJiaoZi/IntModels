convex hull algorithm
from Computational Geometry: Algorithms and Applications book

Demo

var convexHull = require('deberg-convex-hull');
 
var coords = [
    [0, 1],
    [2, 0],
    [3, 1],
    [2, 2],
    [2, 1]
]
 
console.log(convexHull(coords));
// prints [[0, 1],[2, 0],[3, 1],[2, 2]]
 