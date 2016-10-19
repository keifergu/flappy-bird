import Vector  from "./vector.js";

const shapeWord = {
	line: "line",
	point: "point",
	circle: "circle",
	polygon: "polygon",
};

class Point {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}
}

class Line {
	constructor(point_1 = {}, point_2 = {}) {
		this.points = [point_1, point_2];
	}
}

class Circle {
	constructor({x = 0, y = 0, r = 0}) {
		this.x = x;
		this.y = y;
		this.r = r;
	}

	getProjection(normal) {
		let projection;
		// let	point = this.points[0];
		let	v = new Vector(this.x, this.y);
		projection = v.dotProduct(normal);
		return {
			max : projection + this.r,
			min : projection - this.r
		};
	}
}

class Polygon {
	constructor(points = []) {
		this.points = points;
	}
	/**
	 * 获得该多边形的所有边的法向量
	 * @param  {Polygon} polygon 多边形
	 * @return {Array}           包含所有Vector类型法向量的Array
	 */
	getNormals() {
		let v1 = new Vector(),
				v2 = new Vector(),
				normals = [];

		this.points.forEach((point, i, points) => {
			v1.x = point.x;
			v1.y = point.y;

			if (i + 1 < points.length) {
			    v2.x = points[i + 1].x;
			    v2.y = points[i + 1].y;
			} else {
			    v2.x = points[0].x;
			    v2.y = points[0].y;
			}

			normals.push(v1.edge(v2).normal());
		});

		return normals;
	}

	/**
	 * 求多边形在某一条法向量上的投影长度
	 * @param  {Vector} normal 法向量
	 * @return {Object}        返回投影的最大值和最小值
	 */
	getProjection(normal) {
		let projections = [] ,
				max, min,
				v = new Vector();
		this.points.forEach((point) => {
			v.x = point.x;
			v.y = point.y;
			projections.push(v.dotProduct(normal));
		});
		min = Math.min(...projections);
		max = Math.max(...projections);
		return {
			max,
			min,
		};
	}
}
let collisionObject = {
	/**
	 * 多边形与圆形的碰撞检测
	 * @param  {Circle} circle   圆形
	 * @return {Boolean}         true表示碰撞，false表示未碰撞
	 */
	polygon_circle: function(polygon, circle) {
		let pj1, pj2, overlap,
			c = new Circle(circle.data),
		  p = new Polygon(polygon.data),
			normals = p.getNormals();
		for(let n of normals) {
			pj2 = c.getProjection(n);
			pj1 = p.getProjection(n);
			overlap = Math.min(pj1.max, pj2.max) - Math.max(pj1.min, pj2.min);
			if (overlap < 0 ) {
				return false;
			}
		}
		return true;
	},

	circle_polygon: function(circle, polygon) {
		return this.polygon_circle(polygon, circle);
	},

}
/**
 * 说明：接口模式，将外部传入的数据进行转换以适应内部函数使用的格式
 * 目的：考虑到现在的接口设计可能不合理，方便以后进行修改和扩展
 * @param  {Object} shape 从外部传入的图形数据
 * @return {Object}       内部使用的数据格式
 */
function dataTransfer(shape) {
	let rs, type = shape.type;
	switch(type) {
		case shapeWord.polygon:
			rs = {
				type,
				data: shape.points,
			};
			break;
		case shapeWord.circle:
			rs = {
				type,
				data: {
					x: shape.points[0].x,
					y: shape.points[0].y,
					r: shape.r,
				},
			};
			break;
		case shapeWord.line:
			rs = {
				type,
				data: shape.points,
			};
			break;
		case shapeWord.point:
			rs = {
				type,
				data: shape.points,
			};
			break;
		default:
			throw "the `shape.type` must belong to " + Object.values(shapeWord);
	}
	return rs;
}

export default function collision(s1 = {}, s2 = {}) {
	console.log(s1);
	console.log(s2);
	s1 = dataTransfer(s1);
	s2 = dataTransfer(s2);
	console.log(s1.data+s2.data)
	// 使用‘s1.type’和 's2.type'去动态的调用方法，避免了大量的switch,case语句
	return collisionObject[s1.type + "_" + s2.type](s1, s2);
}