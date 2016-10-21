import Draw from "./draw.js";
import Collision from "./collision.js";

const mySymbol = {
	sData: Symbol("sData"),
	pBorder: Symbol("pBorder"),
}

const shapeWord = {
	Line: "line",
	Point: "point",
	Circle: "circle",
	Polygon: "polygon",
};

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
	/**
	 * 私有函数，数据格式转换
	 * 将图形类本身的数据转换为 collision 需要的格式
	 * 接口模式，便于修改和扩展 
	 */
	[mySymbol.sData]() {
		let className = this.constructor.name;
		return {
			points: this.points,
			type: shapeWord[className],
			r: className === "Circle" ? this.r : undefined,
		}
	}

	collision(shape) {
		let s1 = this[mySymbol.sData](),
			s2 = shape[mySymbol.sData]();
		return Collision(s1, s2);
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
 		this._border = this[mySymbol.pBorder]();
 		this._pointsArray = null;
	}
	/**
	 * 私有函数 计算多边形的各个方向的顶点（包含x坐标，y坐标的点）
	 * 例如具有最大X值的点
	 */
	[mySymbol.pBorder]() {
		let minX = Infinity,
			minY = Infinity,
			maxX = -Infinity,
			maxY = -Infinity,
			topIndex,
			leftIndex,
			rightIndex,
			bottomIndex,
			_points = this.points;
		_points.forEach(({x, y}, index) => {
			if (minX >= x) {
				minX = x;
				leftIndex = index;	
			}
			if (minY >= y) {
				minY = y;
				topIndex = 	index;
			}
			if (maxX <= x) {
				maxX = x;
				rightIndex = index; 	
			}
			if (maxY <= y) {
				maxY = y;
				bottomIndex = index;
			}
		})
		return {
			top: _points[topIndex],
			left: _points[leftIndex],
			right: _points[rightIndex],
			bottom: _points[bottomIndex],
		};
	}

	draw(context) {
		//此处使用this._pointArray 的原因缓存数组结果，下次直接调用，不用计算
		//但是我觉得这所能起到的优化作用微乎其微，以后的版本可以去除这个变量
		let _pointsArray = this._pointsArray;
		if (_pointsArray === null) {
			this._pointsArray = Array.from(this.points, (point) => [point.x, point.y])
		}
		//上一个版本这里的bug是因为没有考虑到值拷贝，初始是_pointsArray是null
		Draw.polygon(this._pointsArray, context);
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
		let _point = this.points[0];
		Draw.circle(_point.x, _point.y, this.r, context);
	}

	get top() {
		let _point = this.points[0];
		return {
			x: _point.x,
			y: _point.y - this.r,
		};
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

	get right() {
		let _point = this.points[0];
		return {
			x: _point.x + this.r,
			y: _point.y,
		};
	}
}
