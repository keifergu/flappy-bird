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

//动作储存容器，使用静态方法`Spirt.addAction`添加动作
let actionContainer = {};

Spirit.addAction(defaultAction.jump, (distance = 10) => {
	let ySpeed = -Math.sqrt(2 * distance * this._spirit.speed.ay);
	this._spirit.speed.vy = ySpeed;
})

export default class Spirit {
	constructor({shape = spiritShapeWord.rect, base = [0, 0, 10, 10], speed = 5, imgPath, context}) {
		this.base = base;
		this.shape = shape;
		this.speed = speed;
		this.context = context;
		this._spirit = null;
		if (imgPath !== null) {
			this.img = new Image();
			this.img.src = imgPath;
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
		if (_spirit === null) {
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

	/**
	 * 静态方法，向Spirt类中添加动作函数
	 * 可被所有实例访问到，也可访问所有实例的属性
	 * 此处有潜在的安全问题，对该被添加的action函数应该作出限制
	 * 即在调用时，只传入允许的函数，接口在以后再来设计
	 * @param {[type]} type [description]
	 * @param {[type]} fun  [description]
	 */
	static addAction(type, fun) {
		actionContainer[type] = fun;
	}

	get bottom() {
		return this._spirit.bottom();
	}

	get left() {
		return this._spirit.left();
	}

	get top() {
		return this._spirit.top();
	}

	get right() {
		return this._spirit.right();
	}
}