import {Point, Polygon, Circle, Rect}  from './module/graphical.js';
import * as Collision  from './module/collision.js';

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let cWidth = canvas.width;
let cHeight = canvas.height;
let polygonPoints = [
       [new Point(250, 130), new Point(250, 250),
        new Point(350, 250), new Point(350, 130)],
       [new Point(500, 130), new Point(500, 200),
        new Point(490, 100), new Point(450, 10)]
    ],
    c1 = new Circle(50, 50, 40, {vx: 2, vy: 0}),
    c2 = new Circle(250, 200, 20),
    p11 = new Polygon(polygonPoints[0], {vx: -5, vy: 0}),
    p2 = new Polygon(polygonPoints[0], {vx: -5, vy: 0});
let p1 = new Rect(250, 130, 50, 50);

function gameDraw() {
	graphicalDraw();
	window.requestAnimationFrame(gameDraw);
}

function graphicalDraw() {
	ctx.clearRect(0, 0, 600, 600);
	p1.speed(-10, 0).move().draw(ctx);
	p2.move().draw(ctx);
	c1.draw(ctx);
	if (p1.points[0].x === 0) {
		p1.move(cWidth,0);
	}
	if (p2.points[0].x === 0) {
		p2.move(cWidth,0);
	}
}
canvas.addEventListener("click", () => {
	c1.move(0,-10);
});

gameDraw();