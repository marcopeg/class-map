'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createMap = createMap;
exports.applyPrefix = applyPrefix;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClassMap = exports.ClassMap = function () {
    function ClassMap() {
        _classCallCheck(this, ClassMap);

        this.map = {};
        this.prefix = {
            before: '',
            after: ''
        };

        this.add.apply(this, arguments);
    }

    _createClass(ClassMap, [{
        key: 'setPrefix',
        value: function setPrefix(val) {
            this.prefix.before = val;
        }
    }, {
        key: 'setSuffix',
        value: function setSuffix(val) {
            this.prefix.after = val;
        }
    }, {
        key: 'toString',
        value: function toString(prefix) {
            var _this = this;

            var classes = [];

            if (!prefix) {
                prefix = this.prefix;
            }

            Object.keys(this.map).forEach(function (key) {
                if (_this.map[key]) {
                    classes.push(applyPrefix(key, prefix));
                }
            });

            return classes.join(' ');
        }
    }, {
        key: 'add',
        value: function add() {
            var _this2 = this;

            [].concat(Array.prototype.slice.call(arguments)).forEach(function (arg) {
                if (Array.isArray(arg)) {
                    _this2.add.apply(_this2, arg);
                } else if (arg instanceof Object) {
                    _this2.map = _extends({}, _this2.map, arg);
                } else if (typeof arg === 'string') {
                    _this2.map[arg] = true;
                }
            });
        }
    }, {
        key: 'remove',
        value: function remove() {
            var _this3 = this;

            [].concat(Array.prototype.slice.call(arguments)).forEach(function (arg) {
                if (Array.isArray(arg)) {
                    _this3.remove.apply(_this3, arg);
                } else if (typeof arg === 'string') {
                    _this3.map[arg] = false;
                }
            });
        }
    }, {
        key: 'toggle',
        value: function toggle() {
            var _this4 = this;

            [].concat(Array.prototype.slice.call(arguments)).forEach(function (arg) {
                if (Array.isArray(arg)) {
                    _this4.toggle.apply(_this4, arg);
                } else if (typeof arg === 'string') {
                    _this4.map[arg] = !_this4.map[arg];
                }
            });
        }
    }]);

    return ClassMap;
}();

function createMap() {
    return new ClassMap([].concat(Array.prototype.slice.call(arguments)));
}

function applyPrefix(value, prefix) {
    if (!prefix) {
        return value;
    }

    if (typeof prefix === 'string') {
        return prefix + value;
    }

    if (prefix instanceof Object) {
        return (prefix.before || '') + value + (prefix.after || '');
    }
}