import Spirit from "../module/spirit.js";

export default class Game {
	constructor() {
		this.context = undefined;
	}

	init(canvas) {
		this.width = canvas.width;
		this.height = canvas.height;
		this.context = canvas.getContext('2d');
	}
	
	run() {
		let c1 = new Spirit({
			shape: "rect", 
			context: this.context,
			base: [100, 550, 40, 40],
			speed: 0.2,
		});
		let p2 = new Spirit({
			shape: "rect", 
			context: this.context,
			base: [450, 550, 50, 50],
			speed: -5,
		});
		let p1 = new Spirit({
			shape: "rect", 
			context: this.context,
			base: [250, 550, 40, 40],
			speed: 0.2,
		});
		c1.draw();
	}
}

let t_grade = 0;


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
