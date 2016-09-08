var Vector = function (x, y) {
	this.x = x;
	this.y = y;
};

//向量求差
Vector.prototype.substract = function (vector) {
	return new Vector(this.x - vector.x, this.y - vector.y);
};

//求向量的法向量
Vector.prototype.prependicular = function () {
	return new Vector(this.y, -this.x);
};

//求向量长度
Vector.prototype.getMagnitude = function () {
	return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
};

//求单位向量
Vector.prototype.normalize = function () {
	var v = new Vector(0, 0),
		m = this.getMagnitude();
	if (m != 0) {
		v.x = this.x / m;
		v.y = this.y / m;
	}
	return v;
};

//求矢量点积
Vector.prototype.dotProduct = function (vector) {
	return this.x * vector.x + this.y * vector.y;
};