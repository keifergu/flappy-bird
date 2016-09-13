class Vector {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}

	substract(vector) {
		return new Vector(this.x - vector.x, this.y - vector.y);
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