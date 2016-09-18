import {should} from 'chai';
import Vector from '../../src/module/vector.js';

should();

describe('Vector', () => {
	describe('#constructor', () => {
		let numVector;
		let vecVector;

		beforeEach(() => {
			numVector = new Vector(10, 20);
			vecVector = new Vector(numVector);
		});

		it('constructor by number x & y', () => {
			numVector.x.should.equal(10);
			numVector.y.should.equal(20);
		});

		it('constructor by Vector', () => {
			vecVector.x.should.equal(10);
			vecVector.y.should.equal(20);
		});


	});
});