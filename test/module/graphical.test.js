import {should} from 'chai';
import * as collision from '../../src/module/collision.js';
import {Point, Polygon, Circle} from '../../src/module/graphical.js';

should();

describe('Graphical ', () => {

	describe('#Shape basic method', () => {
		
			let polygonPoints = [
				        [new Point(250, 130), new Point(250, 250),
				         new Point(350, 250), new Point(400, 150)],
				        [new Point(400, 130), new Point(400, 200),
				         new Point(490, 100), new Point(450, 10)]
				    ],
				p1 = new Polygon(polygonPoints[0], {vx:10,vy:10});
	

		it('should get the speed', () => {
			p1.speed.vx.should.to.be.equal(10);
			p1.speed.vy.should.to.be.equal(10);
		});
		it('should set the speed', () => {
			p1.speed.vx = 20;
			p1.speed.vy = 30;
			p1.speed.vx.should.to.be.equal(20);
			p1.speed.vy.should.to.be.equal(30);			
		});
	})

	describe('#Polygon', () => {
	
			let polygonPoints = [
				        [new Point(250, 130), new Point(250, 250),
				         new Point(350, 250), new Point(400, 150)],
				        [new Point(400, 130), new Point(400, 200),
				         new Point(490, 100), new Point(450, 10)]
				    ],
				p1 = new Polygon(polygonPoints[0], {vx:10, vy:10});


		it('constructor: should creat a polygon', () => {
			p1.points.should.to.be.equal(polygonPoints[0]);
			p1.speed.should.to.be.deep.equal({vx:10, vy:10, ax:0, ay:0});
		});
		it('move: should change the x & y', () => {
			p1.move();
			p1.points.should.to.be.deep.equal([new Point(260, 140), new Point(260, 260), new Point(360, 260), new Point(410, 160)]);
		});
	});

	describe('#Circle', () => {
		let c1 = new Circle(20, 20, 20);
		it('should crate a circle', () => {
			c1.points[0].should.to.be.deep.equal({x:20, y:20});
			c1.r.should.to.be.equal(20);
		});
		it('should change the x & y', () => {
			c1.move();
			c1.points.should.to.be.deep.equal([{x:20, y:20}]);
		});
	});
});