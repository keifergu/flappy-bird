import {Point, Polygon, Circle, Rect}  from './module/graphical.js';
import * as Collision  from './module/collision.js';
import {key} from "./module/keyboard.js";

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let cWidth = canvas.width,
    cHeight = canvas.height;
let flag_p1 = true,
		flag_p2 = true,
		t_grade = 0;
let c1 = new Circle(100, 500, 40, {vx:0, vy:0}, {ax:0, ay:0.2}),
    p2 = new Rect(450, 550, 50, 50, {vx: -5, vy: 0}),
    p1 = new Rect(250, 550, 50, 50);

function gameDraw() {
	graphicalDraw();
	window.requestAnimationFrame(gameDraw);
}

function graphicalDraw() {
	ctx.clearRect(0, 0, 600, 600);
	ctx.font = "48px serif";
	ctx.fillText(t_grade, 10, 50);
	p1.speed(-5, 0).move().draw(ctx);
	p2.move().draw(ctx);
	c1.move().draw(ctx);
	if (p1.points[0].x === 0) {
		p1.move(cWidth,0);
		flag_p1 = true;
	}
	if (p2.points[0].x === 0) {
		p2.move(cWidth,0);
		flag_p2 = true;
	}
	if (c1.bottom.y >= 600) {
		c1.speed(0, 0).moveTo(100, 560);
	}
	if (p1.collision(c1) || p2.collision(c1)) {
		// console.log('collision');
	}	
	grade();
}

function grade() {
	if (flag_p1 && c1.bottom.x >= p1.points[1].x) {
		t_grade += 1;
		flag_p1 = false;
	}
	if (flag_p2 && c1.bottom.x >= p2.points[1].x) {
		t_grade += 1;
		flag_p2 = false;
	}
}
key.on("space", () => {
	c1.speed(0, -8);
});

gameDraw();