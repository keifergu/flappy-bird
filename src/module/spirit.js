import {Shape, Polygon, Circle, Rect}  from "./graphical.js";
import * as Collision from "./collision.js";

/**
 * 说明： Spirit具有的类型的字符串
 * 用途： Spirit的形状类型，在创建Spirit时需要指定其类型
 * @type {Object}
 */
let spiritShapeWord = {
	rect: "rect",
	circle: "circle",
	polygon: "polygon",
};

/**
 * 说明： 移动方式的字符串集合
 * 用途： Spirit的移动方向，在实例调用是需要指定
 * @type {Object}
 */
let moveWord = {
	up: "up",
	left: "left",
	down: "down",
	stop: "stop",
	right: "right",
};

/**
 * 说明： Spirit的默认的动作的字符串，不是动作容器
 * 用途： 默认的动作
 * @type {Object}
 */
let defaultAction = {
	jump: "jump", 
};

//动作储存容器，使用静态方法`Spirt.addAction`添加动作
//用户可以自行对Spirit添加动作，保存与此
//但是对于添加的动作是所有实例共享，还是当前实例独有的不太确定，待验证
let actionContainer = {};

export default class Spirit {
	constructor({shape = spiritShapeWord.rect, base = [0, 0, 10, 10], speed = 5, imgPath, context}) {
		this.base = base;
		this.shape = shape;
		this.speed = speed;
		this.context = context;
		this._spirit = undefined;
		if (imgPath !== undefined) {
			this.img = new Image();
			this.img.src = imgPath;
		}
	}
	
	draw() {
		// 此处以及其他地方在函数中保存一份this中某值的拷贝，原因有1
		// 1. 减少代码量，不必在后面使用this.***来调用；
		// 存在的问题： 由于是值拷贝，所以对内部值的赋值，不会影响到this中的值
		// 此处很有可能出现bug，所以一定要清楚相关的值的变化
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
		// bug： 曾经使用_spirit，当运行时，该值为null
		// 原因： 上面新建类时对this的赋值体现不到_spirit值上
		this._spirit.draw(_context);
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
	static addAction(type, func) {
		actionContainer[type] = func;
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
// 添加默认的jump动作
// bug： 此方法的使用在class之前，原因是class不会变量提升，必须在定义后使用
Spirit.addAction(defaultAction.jump, (distance = 10) => {
	let ySpeed = -Math.sqrt(2 * distance * this._spirit.speed.ay);
	this._spirit.speed.vy = ySpeed;
})