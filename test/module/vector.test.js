import {should} from 'chai';
import Vector from '../../src/module/vector.js';

should();

describe('Vector', () => {

	describe('#constructor', () => {
		let numVector = new Vector(10, 20);
		let vecVector = new Vector(numVector);
		it('constructor by number x & y', () => {
			numVector.x.should.equal(10);
			numVector.y.should.equal(20);
		});

		it('constructor by Vector', () => {
			vecVector.x.should.equal(10);
			vecVector.y.should.equal(20);
		});
	});
	describe('#math test', () => {
		let v1 = new Vector(120,200),
				v2 = new Vector(-20,50);
		it('add', () => {
			let result = v1.add(v2);
			let res = [result.x, result.y];
			res.should.to.be.deep.equal([100, 250]);
		});
		it('sub', () => {
			let result = v1.substract(v2);
			result.x.should.to.be.equal(140);
			result.y.should.to.be.equal(150);
		});
		it('normalize', () => {
			let result = v1.substract(v2);
			result.x.should.to.be.equal(140);
			result.y.should.to.be.equal(150);
		});
		it('dotProduct', () => {
			let result = v1.dotProduct(v2);
			result.should.to.be.equal(7600);
		});
		it('edge', () => {
			let result = v1.edge(v2);
			let res = [result.x, result.y];
			res.should.to.be.deep.equal([140, 150]);
		});
	});
});