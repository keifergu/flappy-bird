let drawType = {
	canvas: "canvas",
	dhtml: "dhtml", 
};

export default class Draw {
	static polygon(points, context) {
		context.beginPath();
		points.forEach((point) => {
		    context.lineTo(point[0], point[1]);
		});
		context.closePath();
		context.fill();
	}

	static circle(x, y, r, context) {
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
	}
}
