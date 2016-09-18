/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _graphical = __webpack_require__(1);

	var _collision = __webpack_require__(2);

	var _collision2 = _interopRequireDefault(_collision);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Shape = function Shape(args) {
		_classCallCheck(this, Shape);
	}
	// code


	// methods
	;

	var Polygon = exports.Polygon = function (_Shape) {
		_inherits(Polygon, _Shape);

		function Polygon(x, y, width, height) {
			_classCallCheck(this, Polygon);

			var _this = _possibleConstructorReturn(this, (Polygon.__proto__ || Object.getPrototypeOf(Polygon)).call(this));

			_this.x = x;
			_this.y = y;
			_this.vx = 0;
			_this.vy = 0;
			_this.width = width;
			_this.height = height;
			_this.color = 'black';
			_this.points = [[_this.x, _this.y], [_this.x + _this.width, y], [_this.x + _this.width, _this.y + _this.height], [_this.x, _this.y + _this.height]];
			return _this;
		}

		_createClass(Polygon, [{
			key: 'setColor',
			value: function setColor(color) {
				this.colore = color;
			}
		}, {
			key: 'draw',
			value: function draw(ctx) {
				ctx.beginPath();
				ctx.fillStyle = this.color;
				ctx.fillRect(this.x, this.y, this.width, this.height);
				ctx.closePath();
			}
		}, {
			key: 'set',
			value: function set(obj) {
				var objArr = Object.keys(obj);
				for (var key in objArr) {
					this[objArr[key]] = obj[objArr[key]];
				}
				return this;
			}
		}, {
			key: 'move',
			value: function move() {
				this.x += this.vx;
				this.y += this.vy;
				return this;
			}
		}]);

		return Polygon;
	}(Shape);

	var Circle = exports.Circle = function (_Shape2) {
		_inherits(Circle, _Shape2);

		function Circle(x, y, r) {
			_classCallCheck(this, Circle);

			var _this2 = _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).call(this));

			_this2.x = x;
			_this2.y = y;
			_this2.r = r;
			_this2.vx = 0;
			_this2.vy = 0;
			_this2.color = 'blcak';
			return _this2;
		}

		_createClass(Circle, [{
			key: 'draw',
			value: function draw(ctx) {
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
				ctx.closePath();
				ctx.fillStyle = this.color;
				ctx.fill();
				return this;
			}
		}, {
			key: 'set',
			value: function set(obj) {
				var objArr = Object.keys(obj);
				for (var key in objArr) {
					this[objArr[key]] = obj[objArr[key]];
				}
				return this;
			}
		}, {
			key: 'move',
			value: function move() {
				this.x += this.vx;
				this.y += this.vy;
				return this;
			}
		}, {
			key: 'collision',
			value: function collision(graphical) {
				if (graphical instanceof Rect) {
					var rect = graphical,
					    rectPoints = [],
					    rectVector = [],
					    //各条边的向量的法向量的单位向量
					produnctLength = [],
					    //储存多边形相对于单位向量的点积长度
					circleProdunct;

					var circleVector = new Vector(this.x, this.y);

					rectPoints[0] = new Vector(rect.x, rect.y);
					rectPoints[1] = new Vector(rect.x + rect.width, rect.y);
					rectPoints[2] = new Vector(rect.x + rect.width, rect.y + rect.height);
					rectPoints[3] = new Vector(rect.x, rect.y + rect.height);

					//计算矩形各个边的向量
					for (var i = 0; i + 1 < rectPoints.length; i++) {
						rectVector[i] = rectPoints[i + 1].substract(rectPoints[i]).prependicular().normalize();
					}
					rectVector[3] = rectPoints[0].substract(rectPoints[3]).prependicular().normalize();

					for (var i = 0; i < rectPoints.length; i++) {
						circleProdunct = circleVector.dotProduct(rectVector[i]); //计算圆心和单位向量的点积
						//对矩形上的每个点求点积
						rectPoints.forEach(function (point, key) {
							produnctLength.push(point.dotProduct(rectVector[i]));
						});
						produnctLength.sort();
						if (circleProdunct + this.r >= produnctLength[0] || circleProdunct - this.r <= produnctLength[produnctLength.length]) {
							return true;
						} else {
							return false;
						}
					}
				}
			}
		}]);

		return Circle;
	}(Shape);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.collision = undefined;

	var _graphical = __webpack_require__(1);

	var _vector = __webpack_require__(3);

	var _vector2 = _interopRequireDefault(_vector);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var collision = exports.collision = function collision(aShape, bShape) {};

	function mapCollision(aShape, bShape) {}

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Vector = function () {
		function Vector() {
			_classCallCheck(this, Vector);

			for (var _len = arguments.length, point = Array(_len), _key = 0; _key < _len; _key++) {
				point[_key] = arguments[_key];
			}

			if (point[0] instanceof Vector) {
				this.x = point[0].x;
				this.y = point[0].y;
			} else {
				this.x = point[0];
				this.y = point[1];
			}
		}

		_createClass(Vector, [{
			key: "substract",
			value: function substract(vector) {
				return new Vector(this.x - vector.x, this.y - vector.y);
			}
		}, {
			key: "prependicular",
			value: function prependicular() {
				return new Vector(this.y, -this.x);
			}
		}, {
			key: "getMagnitude",
			value: function getMagnitude() {
				return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
			}
		}, {
			key: "normalize",
			value: function normalize() {
				var v = new Vector(0, 0),
				    m = this.getMagnitude();
				if (m != 0) {
					v.x = this.x / m;
					v.y = this.y / m;
				}
				return v;
			}
		}, {
			key: "dotProduct",
			value: function dotProduct(vector) {
				return this.x * vector.x + this.y * vector.y;
			}
		}]);

		return Vector;
	}();

	module.exports = Vector;

/***/ }
/******/ ]);