class Shape {
	constructor(args) {
		// code
	}

	// methods
}
export class Point {
	constructor(...point) {
		if (point[0] instanceof Vector) {
			this.x = point[0].x;
			this.y = point[0].y;
		} else {
			this.x = point[0];
			this.y = point[1];
		}
	}
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
	constructor(x, y, r) {
		super();
		this.x = x;
		this.y = y;
		this.r = r;
		this.vx = 0;
		this.vy = 0;
		this.color = 'blcak';
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
		ctx.closePath();
		ctx.fillStyle = this.color;
		ctx.fill();
		return this;
	}

	set(obj) {
		var objArr = Object.keys(obj);
		for(var key in objArr) {
			this[objArr[key]] = obj[objArr[key]];
		}
		return this;
	}

	move() {
		this.x += this.vx;
		this.y += this.vy;
		return this;
	}

	collision(graphical) {
		if (graphical instanceof Rect) {
			var rect = graphical,
				rectPoints = [],
				rectVector = [], //各条边的向量的法向量的单位向量
				produnctLength = [],  //储存多边形相对于单位向量的点积长度
				circleProdunct;

			var circleVector = new Vector(this.x, this.y);

			rectPoints[0] = new Vector(rect.x, rect.y);
			rectPoints[1] = new Vector(rect.x + rect.width, rect.y);
			rectPoints[2] = new Vector(rect.x + rect.width, rect.y + rect.height);
			rectPoints[3] = new Vector(rect.x, rect.y + rect.height);

			//计算矩形各个边的向量
			for (var i = 0; i + 1 < rectPoints.length; i++) {
				rectVector[i] = rectPoints[i+1].substract(rectPoints[i]).prependicular().normalize();
			}
			rectVector[3] = rectPoints[0].substract(rectPoints[3]).prependicular().normalize();

			for (var i = 0; i < rectPoints.length; i++) {
				circleProdunct = circleVector.dotProduct(rectVector[i]);  //计算圆心和单位向量的点积
				//对矩形上的每个点求点积
				rectPoints.forEach(function (point, key) {
					produnctLength.push(point.dotProduct(rectVector[i]));
				})
				produnctLength.sort();
				if (circleProdunct + this.r >= produnctLength[0] || circleProdunct - this.r <= produnctLength[produnctLength.length]) {
					return true;
				} else {
					return false;
				}
			}		
		}
	}
}
