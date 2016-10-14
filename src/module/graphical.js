let pSymbol = {
	border: Symbol("border"),
}
export class Shape {
	/**
	 * Shape基类的构造函数
	 * @param  {Array}  points       图形的顶点的数组
	 * @param  {Object} speed		     包含速度参数vx,vy,加速度参数ax.ay
	 * @return {[type]}              
	 */
	constructor(points = [], {vx = 0, vy = 0, ax = 0, ay = 9.8} = {}) {
		this.points = points;
		this.speed = {vx, vy, ax, ay};
	}
	/**
	 * 自动变换坐标函数，根据内部的加速度以及速度值，更新坐标值
	 * @return {this} 返回实例本身
	 */
	move() {
		this.speed.vx += this.speed.ax;
		this.speed.vy += this.speed.ay;
  	this.points.forEach((point) => {
  	    point.x += this.speed.vx;
  	    point.y += this.speed.vy;
  	});
    return this;
	}
	/**
	 * 将图像移动到坐标，points[0]为基本点
	 * @param  {Number} x 目标位置的X坐标
	 * @param  {Number} y 目标位置的Y坐标
	 * @return {[type]}   返回实例本身
	 */
	moveTo(x = 0, y = 0) {
		let dx = x - this.points[0].x,
			dy = y - this.points[0].y;
		this.points.forEach((point) => {
		    point.x += dx;
		    point.y += dy;
		});
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
	 * @param  {Object} speed    包含速度参数vx,vy,加速度参数ax.ay
	 */
 	constructor(points = [], speed = {}) {
 		super(points, speed);
 		this._border = this[pSymbol.border]();
	}

	draw(context) {
    context.beginPath();
    this.points.forEach((point) => {
        context.lineTo(point.x, point.y);
    });
    context.closePath();
    context.fill();
	}

	[pSymbol.border]() {
		let minX = Infinity,
			minY = Infinity,
			maxX = -Infinity,
			maxY = -Infinity,
			leftIndex,
			topIndex,
			rigthIndex,
			bottomIndex,
			_points = this.points;
		_points.forEach(({x, y}, index) => {
			minX = minX <= x ? minX : x;
			leftIndex = minX <= x ? leftIndex : index;

			minY = minY <= y ? minY : y;
			topIndex = minY <= y ? topIndex : index;

			maxX = maxX >= x ? maxX : x;
			rigthIndex = maxX >= x ? rigthIndex : index;

			maxY = maxY >= y ? maxY : y;
			bottomIndex = maxY >= y ? bottomIndex : index;
		})
		return {
			left: _points[leftIndex],
			rigth: _points[rigthIndex],
			top: _points[topIndex],
			bottom: _points[bottomIndex],
		};
	}

	get top() {
		return this._border.top;
	}

	get bottom() {
		return this._border.bottom;
	}

	get left() {
		return this._border.left;
	}

	get right() {
		return this._border.right;
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
	 * @param  {Object} speed 	 对象，包含速度参数vx,vy,加速度参数ax.ay
	 */
	constructor(x = 0, y = 0, radius = 0, speed = {}) {
		super([{x, y}], speed);
		this.r = radius;
	}

	draw(context) {
		let point = this.points[0];
    context.beginPath();
    context.arc(point.x, point.y, this.r, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
	}

	get bottom() {
		return {
			x: this.points[0].x ,
			y: this.points[0].y + this.r
		};
	}

	get left() {
		return {
			x: this.points[0].x - this.r ,
			y: this.points[0].y
		};
	}
}
