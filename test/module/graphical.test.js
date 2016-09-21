import {should} from 'chai';
import * as collision from '../../src/module/collision.js';
import {Point, Polygon, Circle} from '../../src/module/graphical.js';

should();

describe('Graphical ', () => {
	describe('#Polygon', () => {
		let polygonPoints = [
		        [new Point(250, 130), new Point(250, 250),
		         new Point(350, 250), new Point(400, 150)],
		        [new Point(400, 130), new Point(400, 200),
		         new Point(490, 100), new Point(450, 10)]
		    ],
			p1 = new Polygon(polygonPoints[0], {x:10,y:10});
		it('should creat a polygon', () => {
			p1.points.should.to.be.equal(polygonPoints[0]);
		});
	});
});