import {should} from 'chai';
import * as Collision from '../../src/module/collision.js';
import {Point, Polygon, Circle} from '../../src/module/graphical.js';

should();


describe('Collision', () => {
	let polygonPoints = [
	        [new Point(250, 130), new Point(250, 250),
	         new Point(350, 250), new Point(400, 150)],
	        [new Point(400, 130), new Point(400, 200),
	         new Point(490, 100), new Point(450, 10)]
	    ],
	    c1 = new Circle(50, 50, 40, {vx: 100, vy: 100}),
	    c2 = new Circle(250, 200, 20),
	    p1 = new Polygon(polygonPoints[0], {vx: -50, vy: 80}),
	    p2 = new Polygon(polygonPoints[1], {vx: 30, vy: -60}),

	    p1Normals = [[-1,0],[0,1],[0.8944271909999159,0.4472135954999579],[0.13216372009101796,-0.9912279006826346]];

	describe('#polygon with circle', () => {
		it('get polygon`s normal vectors', () => {
			let normals = p1.getPolygonNormal();
			normals.forEach((vector, i) => {
				vector.x.should.to.be.equal(p1Normals[i][0]);
				vector.y.should.to.be.equal(p1Normals[i][1]);
			});
		});
		it('get polygon`s projection', () => {
			let projections = p1.getPolygonProjection({x:-1,y:0});
			projections.should.to.be.deep.equal({max:-250,min:-400});
		});
		it('collision ', () => {
			let res1 = p1.collision(c2);
			let res2 = p1.collision(c1);
			res1.should.to.be.equal(true);
			res2.should.to.be.equal(false);
		});
		it('circle projection', () => {
			let res = c2.getCircleProjection({x:-1,y:0});
			res.should.to.be.deep.equal({max:-230,min:-270});
		});
	});
});