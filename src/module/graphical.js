export class Shape {
	constructor(args) {
		// code
	}

	// methods
}
export class Point {
	constructor(...point) {
		if (point.length == 1) {
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
		if (args.length == 2) {
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
 	constructor(points = [], velocity = {x:10, y:10}) {
 		super();
 		this.points = points;
 		this.v = velocity;
	}
	/**
	 * 为多边形添加一个点
	 * @param {Number} x x轴位置
	 * @param {Number} y y轴位置
	 */
	addPoint(x = 0, y = 0) {
	    this.points.push(new Point(x, y));
	}

	move(dX, dY) {
    this.points.forEach((point) => {
        point.x += dX;
        point.y += dY;
    });
	}

	createPath(context) {
    context.beginPath();
    this.points.forEach((point) => {
        context.lineTo(point.x, point.y);
    });
    context.closePath;
	}

	draw(context) {
    this.createPath(context);
    context.fill();
	}
}
export class Circle extends Shape {
	/**
	 * 圆形类的构造函数
	 * @param  {Number} x        圆心的x坐标
	 * @param  {Number} y        圆心的y坐标
	 * @param  {Number} radius   半径
	 * @param  {Object} velocity 速度
	 */
	constructor(x = 0, y = 0, radius = 0, velocity = {x:0, y:0}) {
		super();
		this.x = x;
		this.y = y;
		this.r = radius;
		this.v = velocity;
	}

	move(dX, dY) {
    this.x += dX;
    this.y += dY;
	}

	createPath(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    context.closePath();
	}

	draw(context) {
    this.createPath(context);
    context.fill();
	}
}
