function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var createHTMLMarker = function createHTMLMarker(googleReference) {
  var HTMLMarker =
  /*#__PURE__*/
  function (_googleReference$maps) {
    _inherits(HTMLMarker, _googleReference$maps);

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

      _this = _possibleConstructorReturn(this, _getPrototypeOf(HTMLMarker).call(this));
      _this.__id = __id;
      _this.anchor = anchor;
      _this.listeners = {};
      _this.latLng = new googleReference.maps.LatLng(position);
      _this.element = document.createElement('div');
      _this.element.className = className;
      _this.element.style.position = 'absolute';
      _this.element.innerHTML = template;

      _this.setMap(map);

      return _this;
    }

    _createClass(HTMLMarker, [{
      key: "onAdd",
      value: function onAdd() {
        // Append the element to the map
        this.getPanes().overlayMouseTarget.appendChild(this.element); // Compute the offset onAdd & cache it because afterwards
        // it won't retrieve the correct values, we also avoid
        // to read the values on every draw

        var bbBox = this.element.getBoundingClientRect();
        this.offset = {
          x: this.anchor.x + bbBox.width / 2,
          y: this.anchor.y + bbBox.height
        }; // Force the width of the element will avoid the
        // content to collapse when we move the map

        this.element.style.width = "".concat(bbBox.width, "px");
      }
    }, {
      key: "draw",
      value: function draw() {
        var position = this.getProjection().fromLatLngToDivPixel(this.latLng);
        this.element.style.left = "".concat(Math.round(position.x - this.offset.x), "px");
        this.element.style.top = "".concat(Math.round(position.y - this.offset.y), "px"); // Markers to the south are in front of markers to the north
        // This is the default behaviour of Google Maps

        this.element.style.zIndex = parseInt(this.element.style.top, 10);
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
          delete this.element;
          delete this.listeners;
        }
      }
    }, {
      key: "addListener",
      value: function addListener(eventName, listener) {
        this.listeners[eventName] = listener;
        this.element.addEventListener(eventName, listener);
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

export default createHTMLMarker;