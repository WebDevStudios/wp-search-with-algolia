"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _preact = require("preact");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* global google EventListener */
var createHTMLMarker = function createHTMLMarker(googleReference) {
  var HTMLMarker = /*#__PURE__*/function (_googleReference$maps) {
    _inherits(HTMLMarker, _googleReference$maps);
    var _super = _createSuper(HTMLMarker);
    function HTMLMarker(_ref) {
      var _this;
      var __id = _ref.__id,
        position = _ref.position,
        map = _ref.map,
        template = _ref.template,
        className = _ref.className,
        _ref$anchor = _ref.anchor,
        anchor = _ref$anchor === void 0 ? {
          x: 0,
          y: 0
        } : _ref$anchor;
      _classCallCheck(this, HTMLMarker);
      _this = _super.call(this);
      _defineProperty(_assertThisInitialized(_this), "__id", void 0);
      _defineProperty(_assertThisInitialized(_this), "anchor", void 0);
      _defineProperty(_assertThisInitialized(_this), "offset", void 0);
      _defineProperty(_assertThisInitialized(_this), "listeners", void 0);
      _defineProperty(_assertThisInitialized(_this), "latLng", void 0);
      _defineProperty(_assertThisInitialized(_this), "element", void 0);
      _this.__id = __id;
      _this.anchor = anchor;
      _this.listeners = {};
      _this.latLng = new googleReference.maps.LatLng(position);
      _this.element = document.createElement('div');
      _this.element.className = className;
      _this.element.style.position = 'absolute';
      if (_typeof(template) === 'object') {
        (0, _preact.render)(template, _this.element);
      } else {
        _this.element.innerHTML = template;
      }
      _this.setMap(map);
      return _this;
    }
    _createClass(HTMLMarker, [{
      key: "onAdd",
      value: function onAdd() {
        // Append the element to the map
        this.getPanes().overlayMouseTarget.appendChild(this.element);

        // Compute the offset onAdd & cache it because afterwards
        // it won't retrieve the correct values, we also avoid
        // to read the values on every draw
        var bbBox = this.element.getBoundingClientRect();
        this.offset = {
          x: this.anchor.x + bbBox.width / 2,
          y: this.anchor.y + bbBox.height
        };

        // Force the width of the element will avoid the
        // content to collapse when we move the map
        this.element.style.width = "".concat(bbBox.width, "px");
      }
    }, {
      key: "draw",
      value: function draw() {
        var position = this.getProjection().fromLatLngToDivPixel(this.latLng);
        this.element.style.left = "".concat(Math.round(position.x - this.offset.x), "px");
        this.element.style.top = "".concat(Math.round(position.y - this.offset.y), "px");

        // Markers to the south are in front of markers to the north
        // This is the default behaviour of Google Maps
        this.element.style.zIndex = String(parseInt(this.element.style.top, 10));
      }
    }, {
      key: "onRemove",
      value: function onRemove() {
        var _this2 = this;
        if (this.element) {
          this.element.parentNode.removeChild(this.element);
          Object.keys(this.listeners).forEach(function (eventName) {
            _this2.element.removeEventListener(eventName, _this2.listeners[eventName]);
          });

          // after onRemove the class is no longer used, thus it can be deleted
          // @ts-expect-error
          delete this.element;
          // @ts-expect-error
          delete this.listeners;
        }
      }
    }, {
      key: "addListener",
      value: function addListener(eventName, listener) {
        this.listeners[eventName] = listener;
        var element = this.element;
        element.addEventListener(eventName, listener);
        return {
          remove: function remove() {
            return element.removeEventListener(eventName, listener);
          }
        };
      }
    }, {
      key: "getPosition",
      value: function getPosition() {
        return this.latLng;
      }
    }]);
    return HTMLMarker;
  }(googleReference.maps.OverlayView);
  return HTMLMarker;
};
var _default = exports.default = createHTMLMarker;