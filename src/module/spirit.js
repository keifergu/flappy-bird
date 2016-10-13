import {Shape, Polygon, Circle}  from "./graphical.js";
import * as Collision from "collision.js";

let spiritShapeWord = {
	polygon: "polygon",
	circle: "circle",
	rect: "rect",
}

let moveWord = {
	left: "left",
	right: "right",
	up: "up",
	down: "down",
}
export default class Spirit {
	constructor({shape: spiritShapeWord.rect, base: [0, 0, 10, 10], img, context}) {
		this.shape = shape;
		this.base = base;
		this.ctx = context;
		this._spirit = undefined;
		if (img !== null) {
			this.img = new Image();
			this.img.src = img;
		}
	}
	
	draw() {
		if (this.context === undefined) {
			throw "must init the canvas context";
		}
		//当spirit没有创建实例时，新建实例
		if (this._spirit === undefined) {
			switch(this.shape) {
				case spiritShapeWord.rect:
					this._spirit = new Rect(...this.base);
			}
		}
		//存在图像则绘制图像，只加载一次图像
		if (this.img !== undefined) {
			this.ctx.drawImage(this.img, base[0], base[1]);
		}
		let _spirit = this._spirit;
		_spirit.draw(this.ctx);
	}

	move(direction = moveWord.right) {
		let _speed = {
			vx: Math.abs(this._spirit.speed.vx),
			vy: Math.abs(this._spirit.speed.vy)
		}
		switch(direction) {
			case moveWord.left:
				this._spirit.speed.vx = - _speed.vx;
				break;
			case moveWord.right:
				this._spirit.speed.vx = _speed.vx;
				break;
			case moveWord.up:
				this._spirit.speed.vy = - _speed.vy;
				break;
			case moveWord.left:
				this._spirit.speed.vy = _speed.vy;
				break;
		}
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