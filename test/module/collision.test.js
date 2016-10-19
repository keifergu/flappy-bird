import {should} from 'chai';
// import collision from '../../src/module/collision.js';
import rewire from 'rewire';
// import {Point, Polygon, Circle} from '../../src/module/graphical.js';

should();

let Collision = rewire('../../src/module/collision.js');
let cget = Collision.__get__;
let Point = cget("Point"),
	Circle = cget("Circle"),
	Polygon = cget("Polygon"),
	collision = cget("collision");

describe('Collision', () => {
	let polygonPoints = [
	        [[250, 130], [250, 250],
	         [350, 250], [400, 150]],
	        [[400, 130], [400, 200],
	         [490, 100], [450, 10]]
	    ],
	    c1 = new Circle({x:50, y:50, r:40}),
	    c2 = new Circle({x:250, y:200, r:20}),
	    p1 = new Polygon(polygonPoints[0].map((v)=>{return {x:v[0],y:v[1]};})),
	    p2 = new Polygon(polygonPoints[1].map((v)=>{return {x:v[0],y:v[1]};})),

	    p1Normals = [[-1,0],[0,1],[0.8944271909999159,0.4472135954999579],[0.13216372009101796,-0.9912279006826346]];

	describe('#polygon with circle', () => {
		it('get polygon`s normal vectors', () => {
			let normals = p1.getNormals();
			normals.forEach((vector, i) => {
				vector.x.should.to.be.equal(p1Normals[i][0]);
				vector.y.should.to.be.equal(p1Normals[i][1]);
			});
		});
		it('get polygon`s projection', () => {
			let projections = p1.getProjection({x:-1,y:0});
			projections.should.to.be.deep.equal({max:-250,min:-400});
		});
		it('circle projection', () => {
			let res = c2.getProjection({x:-1,y:0});
			res.should.to.be.deep.equal({max:-230,min:-270});
		});
		it('collision ', () => {
			let dp1 = {
					type: "polygon",
					points: polygonPoints[0].map((v) => {return {x:v[0],y:v[1]};}),
				},
				dc1 = {
					type: "circle",
					points: [{x:50,y:40}],
					r: 40,
				},
				dc2 = {
					type: "circle",
					points: [{x:250, y:240}],
					r: 20,
				};
			let res1 = collision(dp1, dc1);
			let res2 = collision(dp1, dc2);
			res2.should.to.be.equal(true);
			res1.should.to.be.equal(false);
		});
	});
});