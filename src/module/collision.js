import {Polygon, Circle}  from "./graphical.js";
import Vector  from "./vector.js";

export function collision(theShape, anotherShape) {
	return polygonCollidesWithCircle(theShape, anotherShape);
}
/**
 * 多边形与圆形的碰撞检测
 * @param  {Polygon} polygon 多边形
 * @param  {Circle} circle   圆形
 * @return {Boolean}         true表示碰撞，false表示未碰撞
 */
export function polygonCollidesWithCircle(polygon, circle) {
	let projection1, projection2, overlap,
			normalVectors = getPolygonNormal(polygon);
	normalVectors.forEach((normal) => {
		projection1 = getPolygonProjection(polygon, normal);
		projection2 = getCircleProjection(circle, normal);

		overlap = Math.min(projection1.max, projection2.max) - Math.max(projection1.min, projection2.min);
		if (overlap >= 0) {
			return true;
		}
	})
	return false;
}
/**
 * 获得该多边形的所有边的法向量
 * @param  {Polygon} polygon 多边形
 * @return {Array}           包含所有Vector类型法向量的Array
 */
export function getPolygonNormal(polygon) {
	let v1 = new Vector(),
			v2 = new Vector(),
			normalVector = [];

	polygon.points.forEach((point, i, points) => {
		v1.x = point.x;
		v1.y = point.y;

		if (i + 1 < points.length) {
		    v2.x = points[i + 1].x;
		    v2.y = points[i + 1].y;
		} else {
		    v2.x = points[0].x;
		    v2.y = points[0].y;
		}

		normalVector.push(v1.edge(v2).normal());
	})

	return normalVector;
}

/**
 * 求多边形在某一条法向量上的投影长度
 * @param  {Vector} normal 法向量
 * @return {Object}        返回投影的最大值和最小值
 */
export function getPolygonProjection(polygon, normal) {
	let projections = [] ,
			max, min,
			v = new Vector();
	polygon.points.forEach((point) => {
		v.x = point.x;
		v.y = point.y;
		projections.push(v.dotProduct(normal));
	})
	min = Math.min(...projections);
	max = Math.max(...projections);
	return {
		max,
		min,
	}
}

export function getCircleProjection(circle, normal) {
	let projection,
			v = new Vector(circle.x, circle.y);
	projection = v.dotProduct(normal);
	return {
		max : projection + circle.r,
		min : projection - circle.r
	}
}