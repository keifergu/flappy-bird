import {Point, Polygon, Circle}  from './module/graphical.js';
import * as Collision  from './module/collision.js';

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


function gameDraw() {
	graphicalDraw();
	window.requestAnimationFrame(gameDraw);
}

function graphicalDraw() {
	ctx.clearRect(0, 0, 600, 600);
	p1.move(-2, 0);
	c1.draw(ctx);
	p1.draw(ctx);
}
canvas.addEventListener("click", () => {
	c1.move(0,-10);
});

gameDraw();