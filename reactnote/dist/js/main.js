"use strict";

var _jsx = function () { var REACT_ELEMENT_TYPE = typeof Symbol === "function" && Symbol.for && Symbol.for("react.element") || 0xeac7; return function createRawReactElement(type, props, key, children) { var defaultProps = type && type.defaultProps; var childrenLength = arguments.length - 3; if (!props && childrenLength !== 0) { props = {}; } if (props && defaultProps) { for (var propName in defaultProps) { if (props[propName] === void 0) { props[propName] = defaultProps[propName]; } } } else if (!props) { props = defaultProps || {}; } if (childrenLength === 1) { props.children = children; } else if (childrenLength > 1) { var childArray = Array(childrenLength); for (var i = 0; i < childrenLength; i++) { childArray[i] = arguments[i + 3]; } props.children = childArray; } return { $$typeof: REACT_ELEMENT_TYPE, type: type, key: key === undefined ? null : '' + key, ref: null, props: props, _owner: null }; }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var add = false;
var open = false;
var daysKey = 0;

var notation = [];

var DateFind = function (_React$Component) {
	_inherits(DateFind, _React$Component);

	function DateFind() {
		_classCallCheck(this, DateFind);

		return _possibleConstructorReturn(this, (DateFind.__proto__ || Object.getPrototypeOf(DateFind)).apply(this, arguments));
	}

	_createClass(DateFind, [{
		key: "dateCheck",
		value: function dateCheck() {
			var Data = new Date();
			var year = Data.getFullYear();
			var month = Data.getMonth();
			var day = Data.getDate();
			month++;
			if (month < 10) {
				month = "0" + month;
			}
			return day + "." + month + "." + year;
		}
	}, {
		key: "render",
		value: function render() {
			return _jsx("div", {
				className: "cal-head"
			}, void 0, _jsx("span", {
				className: "current-data"
			}, void 0, this.dateCheck()));
		}
	}]);

	return DateFind;
}(React.Component);

var Day = function (_React$Component2) {
	_inherits(Day, _React$Component2);

	function Day(props) {
		_classCallCheck(this, Day);

		var _this2 = _possibleConstructorReturn(this, (Day.__proto__ || Object.getPrototypeOf(Day)).call(this, props));

		_this2.state = { message: '' };

		_this2.handle = _this2.handle.bind(_this2);
		return _this2;
	}

	_createClass(Day, [{
		key: "handle",
		value: function handle() {
			//console.log(this);
			daysKey = this.props.number;
			var status = "Выбран " + daysKey + "-й день";

			if (notation[daysKey]) {
				document.getElementsByClassName('note-header')[0].value = notation[daysKey].header;
				document.getElementsByClassName('note-text')[0].value = notation[daysKey].text;
				status = "Вы редактируете " + daysKey + "-й день";
			}

			document.getElementById('left').innerHTML = status;
		}
	}, {
		key: "render",
		value: function render() {
			return _jsx("div", {
				className: "cal-day",
				onClick: this.handle
			}, void 0, this.props.number);
		}
	}]);

	return Day;
}(React.Component);

var CalBody = function (_React$Component3) {
	_inherits(CalBody, _React$Component3);

	_createClass(CalBody, [{
		key: "getDaysCount",
		value: function getDaysCount() {
			var reg = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			var int = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			var daysCount = 0;
			var arr = [];
			var Data = new Date();
			var year = Data.getFullYear();
			var month = Data.getMonth();
			if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
				daysCount = int[month];
			} else {
				daysCount = reg[month];
			}

			for (var i = 1; i <= daysCount; i++) {
				arr.push(i);
			}
			return arr;
		}
	}]);

	function CalBody(props) {
		_classCallCheck(this, CalBody);

		var _this3 = _possibleConstructorReturn(this, (CalBody.__proto__ || Object.getPrototypeOf(CalBody)).call(this, props));

		_this3.state = { days: _this3.getDaysCount() };

		return _this3;
	}

	_createClass(CalBody, [{
		key: "render",
		value: function render() {
			return _jsx("div", {
				className: "cal-body"
			}, void 0, this.state.days.map(function (day, i) {
				return _jsx(Day, {
					number: day
				});
			}));
		}
	}]);

	return CalBody;
}(React.Component);

var _ref = _jsx("div", {
	className: "calendar"
}, void 0, _jsx("div", {
	className: "cal"
}, void 0, _jsx(DateFind, {}), _jsx(CalBody, {})));

var Calendar = function (_React$Component4) {
	_inherits(Calendar, _React$Component4);

	function Calendar() {
		_classCallCheck(this, Calendar);

		return _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).apply(this, arguments));
	}

	_createClass(Calendar, [{
		key: "render",
		value: function render() {
			return _ref;
		}
	}]);

	return Calendar;
}(React.Component);

var _ref2 = _jsx("div", {}, void 0, _jsx("span", {
	className: "hh"
}, void 0, "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A:"), " ", _jsx("br", {}), _jsx("input", {
	type: "text",
	className: "note-header"
}));

var _ref3 = _jsx("span", {
	className: "hh"
}, void 0, "\u0421\u043E\u0434\u0435\u0440\u0436\u0430\u043D\u0438\u0435:");

var _ref4 = _jsx("br", {});

var _ref5 = _jsx("textarea", {
	wrap: "soft",
	id: "",
	cols: "30",
	rows: "16",
	maxLength: "300",
	className: "note-text"
});

var _ref6 = _jsx("span", {
	className: "left",
	id: "left"
}, void 0, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0435\u043D\u044C");

var _ref7 = _jsx("div", {
	className: "note"
}, void 0, _jsx("div", {
	className: "newNote"
}, void 0, _jsx("div", {}, void 0, _jsx("span", {
	className: "hh"
}, void 0, "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0435\u043D\u044C"))));

var Note = function (_React$Component5) {
	_inherits(Note, _React$Component5);

	function Note(props) {
		_classCallCheck(this, Note);

		var _this5 = _possibleConstructorReturn(this, (Note.__proto__ || Object.getPrototypeOf(Note)).call(this, props));

		_this5.state = { add: false };
		return _this5;
	}

	_createClass(Note, [{
		key: "clearForm",
		value: function clearForm() {
			document.getElementsByClassName('note-header')[0].value = "";
			document.getElementsByClassName('note-text')[0].value = "";
			document.getElementById('left').innerHTML = 'Выберите день';
		}
	}, {
		key: "addNew",
		value: function addNew() {
			notation[daysKey] = {
				number: daysKey,
				header: document.getElementsByClassName('note-header')[0].value,
				text: document.getElementsByClassName('note-text')[0].value
			};
			document.getElementsByClassName('note-header')[0].value = "";
			document.getElementsByClassName('note-text')[0].value = "";
			document.getElementById('left').innerHTML = 'Выберите день';
			//console.log(notation);
		}
	}, {
		key: "render",
		value: function render() {
			if (!add) {
				return _jsx("div", {
					className: "note"
				}, void 0, _jsx("div", {
					className: "newNote"
				}, void 0, _ref2, _jsx("div", {}, void 0, _ref3, " ", _ref4, _ref5, _jsx("button", {
					className: "addNote",
					onClick: this.addNew
				}, void 0, "+"), _jsx("button", {
					className: "clearForm",
					onClick: this.clearForm
				}, void 0, "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0444\u043E\u0440\u043C\u0443"), _ref6)));
			} else {
				return _ref7;
			}
		}
	}]);

	return Note;
}(React.Component);

var _ref8 = _jsx("div", {
	className: "main"
}, void 0, _jsx(Calendar, {}), _jsx(Note, {}));

var Main = function (_React$Component6) {
	_inherits(Main, _React$Component6);

	function Main() {
		_classCallCheck(this, Main);

		return _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).apply(this, arguments));
	}

	_createClass(Main, [{
		key: "render",
		value: function render() {
			return _ref8;
		}
	}]);

	return Main;
}(React.Component);

ReactDOM.render(_jsx(Main, {}), document.getElementById('main'));