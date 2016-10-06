import {Point, Polygon, Circle, Rect}  from './module/graphical.js';
import * as Collision  from './module/collision.js';

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let cWidth = canvas.width;
let cHeight = canvas.height;
let c1 = new Circle(50, 500, 40, {vx:0, vy:0}, {ax:0, ay:0.2}),
    p2 = new Rect(450, 550, 50, 50, {vx: -5, vy: 0});
let p1 = new Rect(250, 550, 50, 50);

function gameDraw() {
	graphicalDraw();
	window.requestAnimationFrame(gameDraw);
}

function graphicalDraw() {
	ctx.clearRect(0, 0, 600, 600);
	p1.speed(-5, 0).move().draw(ctx);
	p2.move().draw(ctx);
	c1.move().draw(ctx);
	if (p1.points[0].x === 0) {
		p1.move(cWidth,0);
	}
	if (p2.points[0].x === 0) {
		p2.move(cWidth,0);
	}
	if (c1.bottomY >= 600) {
		c1.speed(0, 0).moveTo(50, 560);
	}
}

canvas.addEventListener("click", () => {
	c1.speed(0, -8);
});

gameDraw();