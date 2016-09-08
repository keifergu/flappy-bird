var Rect = function (x, y, width, height) {
	this.x = x;
	this.y = y;
	this.vx = 0;
	this.vy = 0;
	this.width  = width;
	this.height = height;
	this.color  = 'black';
}

//设置颜色
Rect.prototype.setColor = function (color) {
	this.colore = color;
}

//绘制矩形
Rect.prototype.draw = function (ctx) {
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.width, this.height);
	ctx.closePath();
}

Rect.prototype.move = function () {
	this.x += this.vx;
	this.y += this.vy;
}

var Circle = function (x, y, r) {
	this.x = x;
	this.y = y;
	this.r = r;
	this.vx = 0;
	this.vy = 0;
	this.color = 'blcak';
}

Circle.prototype.draw = function (ctx) {
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fillStyle = this.color;
	ctx.fill();
	return this;
}

Circle.prototype.setSpeed = function (vx, vy) {
	this.vx = vx;
	this.vy = vy;
	return this;
}
Circle.prototype.move = function () {
	this.x += this.vx;
	this.y += this.vy;
	return this;
}