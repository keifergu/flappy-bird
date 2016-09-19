import {should} from 'chai';
import * as collision from '../../src/module/collision.js';
import {Point, Polygon, Circle} from '../../src/module/graphical.js';

should();


describe('Collision', () => {
	let polygonPoints = [
	        [new Point(250, 130), new Point(250, 250),
	         new Point(350, 250), new Point(400, 150)],
	        [new Point(400, 130), new Point(400, 200),
	         new Point(490, 100), new Point(450, 10)]
	    ],
	    c1 = new Circle(50, 50, 40, {x: 100, y: 100}),
	    c2 = new Circle(250, 200, 20),
	    p1 = new Polygon(polygonPoints[0], {x: -50, y: 80}),
	    p2 = new Polygon(polygonPoints[1], {x: 30, y: -60}),

	    p1Normals = [[-120,0],[0,100],[100,50],[20,-150]];

	describe('#polygon with circle', () => {
		it('get polygon`s normal vectors', () => {
			let normals = collision.getPolygonNormal(p1);
			normals.forEach((vector, i) => {
				vector.x.should.to.be.equal(p1Normals[i][0]);
				vector.y.should.to.be.equal(p1Normals[i][1]);
			})
		});
	});

});