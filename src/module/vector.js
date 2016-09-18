export default class Vector {
	constructor(...point) {
		if (point[0] instanceof Vector) {
			this.x = point[0].x;
			this.y = point[0].y;
		} else {
			this.x = point[0];
			this.y = point[1];
		}
	}
	/**
	 * 向量相加
	 * @param {[type]} vector 相加的向量
	 */
	add(vector) {
	  return new Vector(this.x + vector.x, this.y + vector.y);
	}
	/**
	 * 向量相减	
	 * @param  {[type]} vector 被减的向量
	 * @return {[type]}        返回一个新向量
	 */
	substract(vector) {
		return new Vector(this.x - vector.x, this.y - vector.y);
	}
	/**
	 * 通过两点获得一个向量
	 * @param  {[type]} vector 另一个点
	 * @return {[type]}        新向量，由传入的点指向本身的点
	 */
	edge(vector) {
		return this.subtract(vector);
	}
	/**
	 * 求该向量的垂直向量
	 * @return {[type]} 
	 */
	prependicular() {
		return new Vector(this.y, -this.x);
	}
	/**
	 * 获得该向量的模，即长度
	 * @return {Float} 模的值
	 */
	getMagnitude() {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	}
	/**
	 * 获得该向量的单位向量
	 * @return {Vector} 返回一个新向量
	 */
	normalize() {
		var v = new Vector(0, 0),
			m = this.getMagnitude();
		if (m != 0) {
			v.x = this.x / m;
			v.y = this.y / m;
		}
		return v;
	}
	/**
	 * 获得两个向量的点积
	 * @param  {Vector} vector 另一个向量
	 * @return {Vector}        返回一个新向量
	 */
	dotProduct(vector) {
		return this.x * vector.x + this.y * vector.y;
	}
}