import Spirit from "../../src/module/spirit.js";

let spiritShapeWord = {
	rect: "rect",
	circle: "circle",
	polygon: "polygon",
};

describe('#Spirit', () => {
	describe('when the Spirit was constructed', () => {
		let rectSpirit;
		beforeEach(() => {
			rectSpirit = new Spirit({
				shape: spiritShapeWord.rect,
				base: [0, 0, 10, 10],
				speed: 5,
			})
		});
		it('should have a shape', () => {
			rectSpirit.shape.should.to.be.equal(spiritShapeWord.rect);
		});
		it('should have the base point', () => {
			rectSpirit.base.should.to.be.deep.equal([0, 0, 10, 10]);
		});
		it('should creat a graphical', () => {
			rectSpirit._spirit.__proto__.constructor.name.should.to.be.equal("Rect");
		});
	});
});