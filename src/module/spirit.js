import {Shape, Polygon, Circle, Rect}  from "./graphical.js";

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
 * 用途： Spirit的移动方向，在实例调用时需要指定
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
		// 检测是否传入类图片路径，传入类则新建图片资源
		if (imgPath !== undefined) {
			this.img = new Image();
			this.img.src = imgPath;
		}
		// 根据传入的类型，新建精灵的图形实例
		switch(this.shape) {
			case spiritShapeWord.rect:
				this._spirit = new Rect(...this.base);
				break;
			default:
				throw "请输入正确的精灵类型";
		}
	}
	
	draw() {
		// 此处以及其他地方在函数中保存一份this中某值的拷贝，原因有
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
		//存在图像则绘制图像，只加载一次图像
		if (_img !== undefined) {
			_img.onload = () => {
				_context.drawImage(_img, _base[0], _base[1]);
			};
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
				break;
			default:
				throw "must specify a move action";
		}
		// 运行该函数原因是： spirit的 move函数需要更改坐标
		// 所以不仅要设置速度，还要调用
		this._spirit.move();
	}

	moveTo(x = 0, y = 0) {
		this._spirit.moveTo(x, y);
		return this;
	}

	action(type = "") {
		//调用容器中的函数，并显示传入当前实例的this， 并传入参数
		//将函数参数转换为数组，并将除开第一个参数"type"外的参数传递
		actionContainer[type].apply(this, Array.from(arguments).slice(1));
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
		return this._spirit.bottom;
	}

	get left() {
		return this._spirit.left;
	}

	get top() {
		return this._spirit.top;
	}

	get right() {
		return this._spirit.right;
	}
}
// 添加默认的jump动作
// 此处使用 function 
// bug： 当此方法的使用在class之前时会出错，原因是class不会变量提升，必须在定义后使用
Spirit.addAction(defaultAction.jump, function(distance = 10) {
	this._spirit.speed = {ay: 0.98};
	let ySpeed = -Math.sqrt(2 * distance * this._spirit.speed.ay);
	this._spirit.speed = {vy: ySpeed};
});