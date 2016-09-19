import {Point, Polygon, Circle}  from './module/graphical.js';
import collision  from './module/collision.js';

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let polygonPoints = [
        [new Point(250, 130), new Point(250, 250),
         new Point(350, 250), new Point(400, 150)],
        [new Point(400, 130), new Point(400, 200),
         new Point(490, 100), new Point(450, 10)]
    ],
    c1 = new Circle(50, 50, 40, {x: 100, y: 100}),
    c2 = new Circle(250, 200, 20),
    p1 = new Polygon(polygonPoints[0], {x: -50, y: 80}),
    p2 = new Polygon(polygonPoints[1], {x: 30, y: -60});

c1.draw(ctx);
c2.draw(ctx);
p1.draw(ctx);
p2.draw(ctx);