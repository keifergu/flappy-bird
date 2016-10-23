import Spirit from "../module/spirit.js";
import {key} from "../module/keyboard.js";

let grade, width, height, context,
	c1, p1, p2,
	fp1 = true,
	fp2 = true;

let init = function(canvas) {
	grade = 0;
	width = canvas.width;
	height = canvas.height;
	context = canvas.getContext('2d');
	c1 = new Spirit({
		shape: "rect", 
		context: context,
		base: [100, 550, 40, 40],
	});
	p2 = new Spirit({
		shape: "rect", 
		context: context,
		base: [450, 550, 50, 50],
		speed: 4,
	});
	p1 = new Spirit({
		shape: "rect", 
		context: context,
		base: [250, 550, 40, 40],
		speed: 4,
	});
}

let run = function() {
	key.on("space", () => {
		c1.action("jump", 10);
	})
	screen();
}

let screen = function() {
	let ctx = context;
	ctx.clearRect(0, 0, 600, 600);
	ctx.font = "48px serif";
	ctx.fillText(grade, 10, 50);
	c1.draw();
	p1.draw();
	p2.draw();
	controller();
	window.requestAnimationFrame(screen);
}

let controller = function() {
	p1.move("left");
	p2.move("left");
	// 由于速度的关系，每一帧并不是移动一个像素，所以判定条件不能是 “== 0”
	if (p1.left.x <= 2) {
		fp1 = true;
		p1.moveTo(width, p1.base[1]);
	}
	if (p2.left.x <= 2) {
		fp2 = true;
		p2.moveTo(width, p2.base[1]);
	}

	// 分数判定
	if (fp1 && c1.left.x > p1.left.x) {
		grade += 1;
		fp1 = false;
	}
	if (fp2 && c1.left.x > p2.left.x) {
		grade += 1;
		fp2 = false;
	}
}

export var game =  {
	init,
	run,
};