export class Shape {
	/**
	 * Shape基类的构造函数
	 * @param  {Array}  points       图形的顶点的数组
	 * @param  {Object} velocity     图形的速度的对象，vx与vy
	 * @param  {Object} acceleration 图形的加速度的对象，ax与ay
	 * @return {[type]}              
	 */
	constructor(points = [], velocity = {vx:0, vy:0}, acceleration = {ax:0, ay:0}) {
		this.points = points;
		this.v = velocity;
		this.a = acceleration;
	}
	/**
	 * 使图形的点的x和y坐标改变的函数;
	 * 如果不传入参数，则根据内部的速度值vx和vy更新坐标，同时vx和vy会根据加速度ax和ay更新自己;
	 * 如果传入参数，（dx， dy），则在原左边值上加上传入的参数值
	 * @param  {...[type]} distance 传入参数则为（dx， dy）格式
	 * @return {this}             返回本身，使可以级联调用
	 */
	move(...distance) {
		this.v.vx += this.a.ax;
		this.v.vy += this.a.ay;
		if (distance.length === 2) {
	    this.points.forEach((point) => {
	        point.x += distance[0];
	        point.y += distance[1];
	    });
	  } else {
	  	this.points.forEach((point) => {
	  	    point.x += this.v.vx;
	  	    point.y += this.v.vy;
	  	});
	  }
    return this;
	}
	moveTo(x = 0, y = 0) {
		let dx = x - this.points[0].x,
			dy = y - this.points[0].y;
		this.points.forEach((point) => {
		    point.x += dx;
		    point.y += dy;
		});
		return this;
	}
	/**
	 * 更新speed值的方法
	 * @param  {Number} vx 在x方向的速度
	 * @param  {Number} vy 在y方向的速度
	 * @return {this}      返回实例本身，级联
	 */
	speed(vx = 0, vy = 0) {
		this.v.vx = vx;
		this.v.vy = vy;
		return this;
	}
}

export class Point {
	constructor(...point) {
		if (point.length === 1) {
			this.x = point[0].x;
			this.y = point[0].y;
		} else {
			this.x = point[0];
			this.y = point[1];
		}
	}
}
export class Line extends Shape {
	constructor(...args) {
		super();
		if (args.length === 2) {
			[[this.x, this.y], this.vector] = [...args];
		} else {
			[this.x, this.y, this.vector] = [...args];
		}
	}

	// methods
}
export class Polygon extends Shape {
	/**
	 * 多边形类的构造函数
	 * @param  {Array}  points   Point类型的数组
	 * @param  {Object} velocity x轴和y轴的速度
	 */
 	constructor(points = [], velocity = {vx:0, vy:0}, acceleration = {ax:0, ay:0}) {
 		super(points, velocity, acceleration);
	}
	/**
	 * 为多边形添加一个点
	 * @param {Number} x x轴位置
	 * @param {Number} y y轴位置
	 */
	addPoint(x = 0, y = 0) {
	  this.points.push(new Point(x, y));
	  return this;
	}

	createPath(context) {
    context.beginPath();
    this.points.forEach((point) => {
        context.lineTo(point.x, point.y);
    });
    context.closePath();
	}

	draw(context) {
    this.createPath(context);
    context.fill();
	}
}

export class Rect extends Polygon {
	constructor(x, y, width, height, ...args) {
		let points = [new Point(x, y), new Point(x + width, y),
									new Point(x + width, y + height), new Point(x, y + height)];
		super(points, ...args);
	}
}

export class Circle extends Shape {
	/**
	 * 圆形类的构造函数
	 * @param  {Number} x        圆心的x坐标
	 * @param  {Number} y        圆心的y坐标
	 * @param  {Number} radius   半径
	 * @param  {Object} velocity 速度
	 * @param  {Object} acceleration 加速度
	 */
	constructor(x = 0, y = 0, radius = 0, velocity = {vx:0, vy:0}, acceleration = {ax:0, ay:0}) {
		super([{x, y}], velocity, acceleration);
		this.r = radius;
	}

	createPath(context) {
		let point = this.points[0];
    context.beginPath();
    context.arc(point.x, point.y, this.r, 0, Math.PI * 2, false);
    context.closePath();
	}

	draw(context) {
    this.createPath(context);
    context.fill();
	}

	get bottom() {
		return {
			x: this.points[0].x ,
			y: this.points[0].y + this.r
		}
	}

	get left() {
		return {
			x: this.points[0].x - this.r ,
			y: this.points[0].y
		}
	}
}
