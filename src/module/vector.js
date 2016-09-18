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

	add(vector) {
	  return new Vector(this.x + vector.x, this.y + vector.y);
	}

	substract(vector) {
		return new Vector(this.x - vector.x, this.y - vector.y);
	}

	edge(vector) {
		return this.subtract(vector);
	}

	prependicular() {
		return new Vector(this.y, -this.x);
	}

	getMagnitude() {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	}

	normalize() {
		var v = new Vector(0, 0),
			m = this.getMagnitude();
		if (m != 0) {
			v.x = this.x / m;
			v.y = this.y / m;
		}
		return v;
	}

	dotProduct(vector) {
		return this.x * vector.x + this.y * vector.y;
	}
}