import {Shape, Polygon, Circle}  from "./graphical.js";
import * as Collision from "collision.js";

let spiritShapeWord = {
	rect: "rect",
	circle: "circle",
	polygon: "polygon",
};

let moveWord = {
	up: "up",
	left: "left",
	down: "down",
	stop: "stop",
	right: "right",
};

let defaultAction = {
	jump: "jump", 
};

let actionContainer = {};

Spirit.addAction(defaultAction.jump, (distance = 10) => {
	let ySpeed = Math.sqrt(2 * distance * this._spirit.speed.ay);
	this._spirit.speed.vy = ySpeed;
})

export default class Spirit {
	constructor({shape = spiritShapeWord.rect, base = [0, 0, 10, 10], speed = 5, img, context}) {
		this.base = base;
		this.shape = shape;
		this.speed = speed;
		this.context = context;
		this._spirit = undefined;
		if (img !== null) {
			this.img = new Image();
			this.img.src = img;
		}
	}
	
	draw() {
		let	_img = this.img,
			_base = this.base,
		  _spirit = this._spirit,
			_context = this.context;
		if (_context === undefined) {
			throw "must init the canvas context";
		}
		//当spirit没有创建实例时，新建实例
		if (_spirit === undefined) {
			switch(this.shape) {
				case spiritShapeWord.rect:
					this._spirit = new Rect(..._base);
			}
		}
		//存在图像则绘制图像，只加载一次图像
		if (_img !== undefined) {
			_img.onload = () => {
				_context.drawImage(_img, _base[0], _base[1]);
			}
		}
		_spirit.draw(_context);
	}

	move(direction = moveWord.right) {
		let _speed = this.speed;
		switch(direction) {
			case moveWord.left:
				this._spirit.speed = {vx: -_speed};
				break;
			case moveWord.right:
				this._spirit.speed = {vx: _speed};
				break;
			case moveWord.up:
				this._spirit.speed = {vy: -_speed};
				break;
			case moveWord.down:
				this._spirit.speed = {vy: -_speed};
				break;
			case moveWord.stop:
				this._spirit.speed = {vx: 0, vy: 0};
			default:
				throw "must specify a move action";
				break;
		}
		this._spirit.move();
	}

	action(type = "") {
		return actionContainer[type];
	}

	static addAction(type, fun) {
		actionContainer[type] = fun;
	}
	get bottom() {
		return this._spirit.bottom();
	}

	get left() {
		return this._spirit.left();
	}

	get up() {
		return this._spirit.up();
	}

	get right() {
		return this._spirit.right();
	}
}