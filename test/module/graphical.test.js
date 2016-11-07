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
	});

	describe('#Polygon', () => {
	
		let polygonPoints = [
      [new Point(250, 130), new Point(250, 250),
       new Point(350, 250), new Point(400, 150)],
      [new Point(400, 130), new Point(400, 200),
       new Point(490, 100), new Point(450, 10)]
    ];

		it('constructor: should creat a polygon', () => {
			let p1 = new Polygon(polygonPoints[0], {vx:10, vy:10, ax:0, ay:0});
			p1.points.should.to.be.equal(polygonPoints[0]);
			p1.speed.should.to.be.deep.equal({vx:10, vy:10, ax:0, ay:0});
		});
		it('should get border value', () => {
			let p3 = new Polygon(polygonPoints[0]);
			let border = {
				top: p3.top,
				left: p3.left,
				right: p3.right,
				bottom: p3.bottom,
			};
			let defaultBorder = {
				top: {x: 250, y: 130},
				left: {x: 250, y: 250},
				right: {x: 400, y: 150},
				bottom: {x: 350, y: 250},
			};
			border.should.to.be.deep.equal(defaultBorder);
		});
		it('move: should change the x & y', () => {
			let p2 = new Polygon(polygonPoints[0], {vx:10, vy:10, ax:0, ay:0});
			p2.move();
			p2.points.should.to.be.deep.equal([new Point(260, 140), new Point(260, 260), new Point(360, 260), new Point(410, 160)]);
		});
		it('should collision with circle', () => {
			let res1, res2, 
			  c1 = new Circle(50, 40, 40),
			  c2 = new Circle(250, 240, 20),
				p1 = new Polygon(polygonPoints[0]);
			res1 = p1.collision(c1);
			res2 = p1.collision(c2);
			[res1, res2].should.to.be.deep.equal([false, true]);
		});
	});

	describe('#Circle', () => {
		let c1 = new Circle(20, 20, 20, {ay:0});
		it('should crate a circle', () => {
			c1.points[0].should.to.be.deep.equal({x:20, y:20});
			c1.r.should.to.be.equal(20);
		});
		it('should change the x & y', () => {
			c1.move();
			c1.points.should.to.be.deep.equal([{x:20, y:20}]);
		});
		it('should get border value', () => {
			let border = {
				top: c1.top,
				left: c1.left,
				right: c1.right,
				bottom: c1.bottom,
			};
			let defaultBorder = {
				top: {x: 20, y: 0},
				left: {x: 0, y: 20},
				right: {x: 40, y: 20},
				bottom: {x: 20, y: 40},
			};
			border.should.to.be.deep.equal(defaultBorder);
		});
	});
});