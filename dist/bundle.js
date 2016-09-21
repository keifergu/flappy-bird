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

	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	var polygonPoints = [[new _graphical.Point(250, 130), new _graphical.Point(250, 250), new _graphical.Point(350, 250), new _graphical.Point(400, 150)], [new _graphical.Point(400, 130), new _graphical.Point(400, 200), new _graphical.Point(490, 100), new _graphical.Point(450, 10)]],
	    c1 = new _graphical.Circle(50, 50, 40, { x: 100, y: 100 }),
	    c2 = new _graphical.Circle(250, 200, 20),
	    p1 = new _graphical.Polygon(polygonPoints[0], { x: -50, y: 80 }),
	    p2 = new _graphical.Polygon(polygonPoints[1], { x: 30, y: -60 });
	console.log(p1);
	c1.draw(ctx);
	c2.draw(ctx);
	p1.draw(ctx);
	p2.draw(ctx);

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Shape = function Shape(args) {
		_classCallCheck(this, Shape);
	}
	// code


	// methods
	;

	var Point = exports.Point = function Point() {
		_classCallCheck(this, Point);

		for (var _len = arguments.length, point = Array(_len), _key = 0; _key < _len; _key++) {
			point[_key] = arguments[_key];
		}

		if (point.length == 1) {
			this.x = point[0].x;
			this.y = point[0].y;
		} else {
			this.x = point[0];
			this.y = point[1];
		}
	};

	var Line = exports.Line = function (_Shape) {
		_inherits(Line, _Shape);

		function Line() {
			_classCallCheck(this, Line);

			var _this = _possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).call(this));

			for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
				args[_key2] = arguments[_key2];
			}

			if (args.length == 2) {
				var _ref = [].concat(args);

				var _ref$ = _slicedToArray(_ref[0], 2);

				_this.x = _ref$[0];
				_this.y = _ref$[1];
				_this.vector = _ref[1];
			} else {
				var _ref2 = [].concat(args);

				_this.x = _ref2[0];
				_this.y = _ref2[1];
				_this.vector = _ref2[2];
			}
			return _this;
		}

		// methods


		return Line;
	}(Shape);

	var Polygon = exports.Polygon = function (_Shape2) {
		_inherits(Polygon, _Shape2);

		/**
	  * 多边形类的构造函数
	  * @param  {Array}  points   Point类型的数组
	  * @param  {Object} velocity x轴和y轴的速度
	  */
		function Polygon() {
			var points = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
			var velocity = arguments.length <= 1 || arguments[1] === undefined ? { x: 10, y: 10 } : arguments[1];

			_classCallCheck(this, Polygon);

			var _this2 = _possibleConstructorReturn(this, (Polygon.__proto__ || Object.getPrototypeOf(Polygon)).call(this));

			_this2.points = points;
			_this2.v = velocity;
			return _this2;
		}
		/**
	  * 为多边形添加一个点
	  * @param {Number} x x轴位置
	  * @param {Number} y y轴位置
	  */


		_createClass(Polygon, [{
			key: "addPoint",
			value: function addPoint() {
				var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
				var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

				this.points.push(new Point(x, y));
			}
		}, {
			key: "move",
			value: function move(dX, dY) {
				this.points.forEach(function (point) {
					point.x += dX;
					point.y += dY;
				});
			}
		}, {
			key: "createPath",
			value: function createPath(context) {
				context.beginPath();
				this.points.forEach(function (point) {
					context.lineTo(point.x, point.y);
				});
				context.closePath;
			}
		}, {
			key: "draw",
			value: function draw(context) {
				this.createPath(context);
				context.fill();
			}
		}]);

		return Polygon;
	}(Shape);

	var Circle = exports.Circle = function (_Shape3) {
		_inherits(Circle, _Shape3);

		/**
	  * 圆形类的构造函数
	  * @param  {Number} x        圆心的x坐标
	  * @param  {Number} y        圆心的y坐标
	  * @param  {Number} radius   半径
	  * @param  {Object} velocity 速度
	  */
		function Circle() {
			var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
			var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
			var radius = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
			var velocity = arguments.length <= 3 || arguments[3] === undefined ? { x: 0, y: 0 } : arguments[3];

			_classCallCheck(this, Circle);

			var _this3 = _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).call(this));

			_this3.x = x;
			_this3.y = y;
			_this3.r = radius;
			_this3.v = velocity;
			return _this3;
		}

		_createClass(Circle, [{
			key: "move",
			value: function move(dX, dY) {
				this.x += dX;
				this.y += dY;
			}
		}, {
			key: "createPath",
			value: function createPath(context) {
				context.beginPath();
				context.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
				context.closePath();
			}
		}, {
			key: "draw",
			value: function draw(context) {
				this.createPath(context);
				context.fill();
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
	exports.collision = collision;
	exports.polygonCollidesWithCircle = polygonCollidesWithCircle;
	exports.getPolygonNormal = getPolygonNormal;
	exports.getPolygonProjection = getPolygonProjection;
	exports.getCircleProjection = getCircleProjection;

	var _graphical = __webpack_require__(1);

	var _vector = __webpack_require__(3);

	var _vector2 = _interopRequireDefault(_vector);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function collision(theShape, anotherShape) {
		return polygonCollidesWithCircle(theShape, anotherShape);
	}
	/**
	 * 多边形与圆形的碰撞检测
	 * @param  {Polygon} polygon 多边形
	 * @param  {Circle} circle   圆形
	 * @return {Boolean}         true表示碰撞，false表示未碰撞
	 */
	function polygonCollidesWithCircle(polygon, circle) {
		var projection1 = void 0,
		    projection2 = void 0,
		    overlap = void 0,
		    normalVectors = getPolygonNormal(polygon);
		normalVectors.forEach(function (normal) {
			projection1 = getPolygonProjection(polygon, normal);
			projection2 = getCircleProjection(circle, normal);

			overlap = Math.min(projection1.max, projection2.max) - Math.max(projection1.min, projection2.min);
			if (overlap >= 0) {
				return true;
			}
		});
		return false;
	}
	/**
	 * 获得该多边形的所有边的法向量
	 * @param  {Polygon} polygon 多边形
	 * @return {Array}           包含所有Vector类型法向量的Array
	 */
	function getPolygonNormal(polygon) {
		var v1 = new _vector2.default(),
		    v2 = new _vector2.default(),
		    normalVector = [];

		polygon.points.forEach(function (point, i, points) {
			v1.x = point.x;
			v1.y = point.y;

			if (i + 1 < points.length) {
				v2.x = points[i + 1].x;
				v2.y = points[i + 1].y;
			} else {
				v2.x = points[0].x;
				v2.y = points[0].y;
			}

			normalVector.push(v1.edge(v2).normal());
		});

		return normalVector;
	}

	/**
	 * 求多边形在某一条法向量上的投影长度
	 * @param  {Vector} normal 法向量
	 * @return {Object}        返回投影的最大值和最小值
	 */
	function getPolygonProjection(polygon, normal) {
		var projections = [],
		    max = void 0,
		    min = void 0,
		    v = new _vector2.default();
		polygon.points.forEach(function (point) {
			v.x = point.x;
			v.y = point.y;
			projections.push(v.dotProduct(normal));
		});
		min = Math.min.apply(Math, projections);
		max = Math.max.apply(Math, projections);
		return {
			max: max,
			min: min
		};
	}

	function getCircleProjection(circle, normal) {
		var projection = void 0,
		    v = new _vector2.default(circle.x, circle.y);
		projection = v.dotProduct(normal);
		return {
			max: projection + circle.r,
			min: projection - circle.r
		};
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

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
		/**
	  * 向量相加
	  * @param {[type]} vector 相加的向量
	  */


		_createClass(Vector, [{
			key: "add",
			value: function add(vector) {
				return new Vector(this.x + vector.x, this.y + vector.y);
			}
			/**
	   * 向量相减	
	   * @param  {[type]} vector 被减的向量
	   * @return {[type]}        返回一个新向量
	   */

		}, {
			key: "substract",
			value: function substract(vector) {
				return new Vector(this.x - vector.x, this.y - vector.y);
			}
			/**
	   * 通过两点获得一个向量
	   * @param  {[type]} vector 另一个点
	   * @return {[type]}        新向量，由传入的点指向本身的点
	   */

		}, {
			key: "edge",
			value: function edge(vector) {
				return this.substract(vector);
			}
			/**
	   * 求该向量的垂直向量
	   * @return {[type]} 
	   */

		}, {
			key: "prependicular",
			value: function prependicular() {
				return new Vector(this.y, -this.x);
			}
			/**
	   * 获得该向量的模，即长度
	   * @return {Float} 模的值
	   */

		}, {
			key: "getMagnitude",
			value: function getMagnitude() {
				return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
			}
			/**
	   * 获得该向量的单位向量
	   * @return {Vector} 返回一个新向量
	   */

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
			/**
	   * 获得两个向量的点积
	   * @param  {Vector} vector 另一个向量
	   * @return {Vector}        返回一个新向量
	   */

		}, {
			key: "dotProduct",
			value: function dotProduct(vector) {
				return this.x * vector.x + this.y * vector.y;
			}
			/**
	   * 获取法向量
	   * @return {Vector}
	   */

		}, {
			key: "normal",
			value: function normal() {
				return this.prependicular().normalize();
			}
		}]);

		return Vector;
	}();

	exports.default = Vector;

/***/ }
/******/ ]);