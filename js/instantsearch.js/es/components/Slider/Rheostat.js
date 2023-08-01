function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
/**
 * This is a fork of Rheostat for Preact X.
 *
 * @see https://github.com/airbnb/rheostat
 */import { h, Component, createRef } from 'preact';
var KEYS = {
  DOWN: 40,
  END: 35,
  ESC: 27,
  HOME: 36,
  LEFT: 37,
  PAGE_DOWN: 34,
  PAGE_UP: 33,
  RIGHT: 39,
  UP: 38
};
var PERCENT_EMPTY = 0;
var PERCENT_FULL = 100;
function getPosition(value, min, max) {
  return (value - min) / (max - min) * 100;
}
function getValue(pos, min, max) {
  var decimal = pos / 100;
  if (pos === 0) {
    return min;
  } else if (pos === 100) {
    return max;
  }
  return Math.round((max - min) * decimal + min);
}
function getClassName(props) {
  var orientation = props.orientation === 'vertical' ? 'rheostat-vertical' : 'rheostat-horizontal';
  return ['rheostat', orientation].concat(props.className.split(' ')).join(' ');
}
function getHandleFor(ev) {
  return Number(ev.currentTarget.getAttribute('data-handle-key'));
}
function killEvent(ev) {
  ev.stopPropagation();
  ev.preventDefault();
}
function Button(props) {
  return h("button", _extends({}, props, {
    type: "button"
  }));
}

// Preact doesn't have builtin types for Style, JSX.HTMLAttributes['style'] is just object
// maybe migrate to csstype later?
var _ref6 = h("div", {
  className: "rheostat-background"
});
var Rheostat = /*#__PURE__*/function (_Component) {
  _inherits(Rheostat, _Component);
  var _super = _createSuper(Rheostat);
  function Rheostat() {
    var _this;
    _classCallCheck(this, Rheostat);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "x", [0, 0].map(function (y) {
      return y;
    }));
    _defineProperty(_assertThisInitialized(_this), "state", {
      className: getClassName(_this.props),
      // non-null thanks to defaultProps
      handlePos: _this.props.values.map(function (value) {
        return getPosition(value, _this.props.min, _this.props.max);
      }),
      handleDimensions: 0,
      mousePos: null,
      sliderBox: {},
      slidingIndex: null,
      // non-null thanks to defaultProps
      values: _this.props.values
    });
    _defineProperty(_assertThisInitialized(_this), "rheostat", createRef());
    _defineProperty(_assertThisInitialized(_this), "componentWillReceiveProps", function (nextProps) {
      var _this$props = _this.props,
        className = _this$props.className,
        disabled = _this$props.disabled,
        min = _this$props.min,
        max = _this$props.max,
        orientation = _this$props.orientation;
      var _this$state = _this.state,
        values = _this$state.values,
        slidingIndex = _this$state.slidingIndex;
      var minMaxChanged = nextProps.min !== min || nextProps.max !== max;
      var valuesChanged = values.length !== nextProps.values.length || values.some(function (value, idx) {
        return nextProps.values[idx] !== value;
      });
      var orientationChanged = nextProps.className !== className || nextProps.orientation !== orientation;
      var willBeDisabled = nextProps.disabled && !disabled;
      if (orientationChanged) {
        _this.setState({
          className: getClassName(nextProps)
        });
      }
      if (minMaxChanged || valuesChanged) _this.updateNewValues(nextProps);
      if (willBeDisabled && slidingIndex !== null) {
        _this.endSlide();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "getPublicState", function () {
      var _this$props2 = _this.props,
        min = _this$props2.min,
        max = _this$props2.max;
      var values = _this.state.values;
      return {
        max: max,
        min: min,
        values: values
      };
    });
    _defineProperty(_assertThisInitialized(_this), "getSliderBoundingBox", function () {
      // only gets called after render, so it will always be defined
      var node = _this.rheostat.current;
      var rect = node.getBoundingClientRect();
      return {
        height: rect.height || node.clientHeight,
        left: rect.left,
        top: rect.top,
        width: rect.width || node.clientWidth
      };
    });
    _defineProperty(_assertThisInitialized(_this), "getProgressStyle", function (idx) {
      var handlePos = _this.state.handlePos;
      var value = handlePos[idx];
      if (idx === 0) {
        return _this.props.orientation === 'vertical' ? {
          height: "".concat(value, "%"),
          top: 0
        } : {
          left: 0,
          width: "".concat(value, "%")
        };
      }
      var prevValue = handlePos[idx - 1];
      var diffValue = value - prevValue;
      return _this.props.orientation === 'vertical' ? {
        height: "".concat(diffValue, "%"),
        top: "".concat(prevValue, "%")
      } : {
        left: "".concat(prevValue, "%"),
        width: "".concat(diffValue, "%")
      };
    });
    _defineProperty(_assertThisInitialized(_this), "getMinValue", function (idx) {
      return _this.state.values[idx - 1] ? Math.max(_this.props.min, _this.state.values[idx - 1]) : _this.props.min;
    });
    _defineProperty(_assertThisInitialized(_this), "getMaxValue", function (idx) {
      return _this.state.values[idx + 1] ? Math.min(_this.props.max, _this.state.values[idx + 1]) : _this.props.max;
    });
    _defineProperty(_assertThisInitialized(_this), "getHandleDimensions", function (ev, sliderBox) {
      var handleNode = ev.currentTarget || null;
      if (!handleNode) return 0;
      return _this.props.orientation === 'vertical' ? handleNode.clientHeight / sliderBox.height * PERCENT_FULL / 2 : handleNode.clientWidth / sliderBox.width * PERCENT_FULL / 2;
    });
    _defineProperty(_assertThisInitialized(_this), "getClosestSnapPoint", function (value) {
      // non-null thanks to defaultProps
      if (!_this.props.snapPoints.length) return value;
      return _this.props.snapPoints.reduce(function (snapTo, snap) {
        return Math.abs(snapTo - value) < Math.abs(snap - value) ? snapTo : snap;
      });
    });
    _defineProperty(_assertThisInitialized(_this), "getSnapPosition", function (positionPercent) {
      if (!_this.props.snap) return positionPercent;
      var _ref = _this.props,
        max = _ref.max,
        min = _ref.min;
      var value = getValue(positionPercent, min, max);
      var snapValue = _this.getClosestSnapPoint(value);
      return getPosition(snapValue, min, max);
    });
    _defineProperty(_assertThisInitialized(_this), "getNextPositionForKey", function (idx, keyCode) {
      var _stepMultiplier;
      var _this$state2 = _this.state,
        handlePos = _this$state2.handlePos,
        values = _this$state2.values;
      var _ref2 = _this.props,
        max = _ref2.max,
        min = _ref2.min,
        snapPoints = _ref2.snapPoints;
      var shouldSnap = _this.props.snap;
      var proposedValue = values[idx];
      var proposedPercentage = handlePos[idx];
      var originalPercentage = proposedPercentage;
      var stepValue = 1;
      if (max >= 100) {
        proposedPercentage = Math.round(proposedPercentage);
      } else {
        stepValue = 100 / (max - min);
      }
      var currentIndex = null;
      if (shouldSnap) {
        currentIndex = snapPoints.indexOf(_this.getClosestSnapPoint(values[idx]));
      }
      var stepMultiplier = (_stepMultiplier = {}, _defineProperty(_stepMultiplier, KEYS.LEFT, function (v) {
        return v * -1;
      }), _defineProperty(_stepMultiplier, KEYS.RIGHT, function (v) {
        return v;
      }), _defineProperty(_stepMultiplier, KEYS.UP, function (v) {
        return v;
      }), _defineProperty(_stepMultiplier, KEYS.DOWN, function (v) {
        return v * -1;
      }), _defineProperty(_stepMultiplier, KEYS.PAGE_DOWN, function (v) {
        return v > 1 ? -v : v * -10;
      }), _defineProperty(_stepMultiplier, KEYS.PAGE_UP, function (v) {
        return v > 1 ? v : v * 10;
      }), _stepMultiplier);
      if (Object.prototype.hasOwnProperty.call(stepMultiplier, keyCode)) {
        proposedPercentage += stepMultiplier[keyCode](stepValue);
        if (shouldSnap) {
          if (!currentIndex) {
            // nothing happens
          } else if (proposedPercentage > originalPercentage) {
            // move cursor right unless overflow
            if (currentIndex < snapPoints.length - 1) {
              proposedValue = snapPoints[currentIndex + 1];
            }
            // move cursor left unless there is overflow
          } else if (currentIndex > 0) {
            proposedValue = snapPoints[currentIndex - 1];
          }
        }
      } else if (keyCode === KEYS.HOME) {
        proposedPercentage = PERCENT_EMPTY;
        if (shouldSnap) {
          proposedValue = snapPoints[0];
        }
      } else if (keyCode === KEYS.END) {
        proposedPercentage = PERCENT_FULL;
        if (shouldSnap) {
          proposedValue = snapPoints[snapPoints.length - 1];
        }
      } else {
        return null;
      }
      return shouldSnap ? getPosition(proposedValue, min, max) : proposedPercentage;
    });
    _defineProperty(_assertThisInitialized(_this), "getNextState", function (idx, proposedPosition) {
      var handlePos = _this.state.handlePos;
      var _ref3 = _this.props,
        max = _ref3.max,
        min = _ref3.min;
      var actualPosition = _this.validatePosition(idx, proposedPosition);
      var nextHandlePos = handlePos.map(function (pos, index) {
        return index === idx ? actualPosition : pos;
      });
      return {
        handlePos: nextHandlePos,
        values: nextHandlePos.map(function (pos) {
          return getValue(pos, min, max);
        })
      };
    });
    _defineProperty(_assertThisInitialized(_this), "getClosestHandle", function (positionPercent) {
      var handlePos = _this.state.handlePos;
      return handlePos.reduce(function (closestIdx, _node, idx) {
        var challenger = Math.abs(handlePos[idx] - positionPercent);
        var current = Math.abs(handlePos[closestIdx] - positionPercent);
        return challenger < current ? idx : closestIdx;
      }, 0);
    });
    _defineProperty(_assertThisInitialized(_this), "setStartSlide", function (ev, x, y) {
      var sliderBox = _this.getSliderBoundingBox();
      _this.setState({
        handleDimensions: _this.getHandleDimensions(ev, sliderBox),
        mousePos: {
          x: x,
          y: y
        },
        sliderBox: sliderBox,
        slidingIndex: getHandleFor(ev)
      });
    });
    _defineProperty(_assertThisInitialized(_this), "startMouseSlide", function (ev) {
      _this.setStartSlide(ev, ev.clientX, ev.clientY);
      document.addEventListener('mousemove', _this.handleMouseSlide, false);
      document.addEventListener('mouseup', _this.endSlide, false);
      killEvent(ev);
    });
    _defineProperty(_assertThisInitialized(_this), "startTouchSlide", function (ev) {
      if (ev.changedTouches.length > 1) return;
      var touch = ev.changedTouches[0];
      _this.setStartSlide(ev, touch.clientX, touch.clientY);
      document.addEventListener('touchmove', _this.handleTouchSlide, false);
      document.addEventListener('touchend', _this.endSlide, false);
      if (_this.props.onSliderDragStart) _this.props.onSliderDragStart();
      killEvent(ev);
    });
    _defineProperty(_assertThisInitialized(_this), "handleMouseSlide", function (ev) {
      if (_this.state.slidingIndex === null) return;
      _this.handleSlide(ev.clientX, ev.clientY);
      killEvent(ev);
    });
    _defineProperty(_assertThisInitialized(_this), "handleTouchSlide", function (ev) {
      if (_this.state.slidingIndex === null) return;
      if (ev.changedTouches.length > 1) {
        _this.endSlide();
        return;
      }
      var touch = ev.changedTouches[0];
      _this.handleSlide(touch.clientX, touch.clientY);
      killEvent(ev);
    });
    _defineProperty(_assertThisInitialized(_this), "handleSlide", function (x, y) {
      var _this$state3 = _this.state,
        idx = _this$state3.slidingIndex,
        sliderBox = _this$state3.sliderBox;
      var positionPercent = _this.props.orientation === 'vertical' ? (y - sliderBox.top) / sliderBox.height * PERCENT_FULL : (x - sliderBox.left) / sliderBox.width * PERCENT_FULL;
      _this.slideTo(idx, positionPercent);
      if (_this.canMove(idx, positionPercent)) {
        // update mouse positions
        _this.setState({
          mousePos: {
            x: x,
            y: y
          }
        });
        if (_this.props.onSliderDragMove) _this.props.onSliderDragMove();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "endSlide", function () {
      var idx = _this.state.slidingIndex;
      _this.setState({
        slidingIndex: null
      });
      document.removeEventListener('mouseup', _this.endSlide, false);
      document.removeEventListener('touchend', _this.endSlide, false);
      document.removeEventListener('touchmove', _this.handleTouchSlide, false);
      document.removeEventListener('mousemove', _this.handleMouseSlide, false);
      if (_this.props.onSliderDragEnd) _this.props.onSliderDragEnd();
      if (_this.props.snap) {
        var positionPercent = _this.getSnapPosition(_this.state.handlePos[idx]);
        _this.slideTo(idx, positionPercent, function () {
          return _this.fireChangeEvent();
        });
      } else {
        _this.fireChangeEvent();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "handleClick", function (ev) {
      if (ev.target.getAttribute('data-handle-key')) {
        return;
      }

      // Calculate the position of the slider on the page so we can determine
      // the position where you click in relativity.
      var sliderBox = _this.getSliderBoundingBox();
      var positionDecimal = _this.props.orientation === 'vertical' ? (ev.clientY - sliderBox.top) / sliderBox.height : (ev.clientX - sliderBox.left) / sliderBox.width;
      var positionPercent = positionDecimal * PERCENT_FULL;
      var handleId = _this.getClosestHandle(positionPercent);
      var validPositionPercent = _this.getSnapPosition(positionPercent);

      // Move the handle there
      _this.slideTo(handleId, validPositionPercent, function () {
        return _this.fireChangeEvent();
      });
      if (_this.props.onClick) _this.props.onClick();
    });
    _defineProperty(_assertThisInitialized(_this), "handleKeydown", function (ev) {
      var idx = getHandleFor(ev);
      if (ev.keyCode === KEYS.ESC) {
        ev.currentTarget.blur();
        return;
      }
      var proposedPercentage = _this.getNextPositionForKey(idx, ev.keyCode);
      if (proposedPercentage === null) return;
      if (_this.canMove(idx, proposedPercentage)) {
        _this.slideTo(idx, proposedPercentage, function () {
          return _this.fireChangeEvent();
        });
        if (_this.props.onKeyPress) _this.props.onKeyPress();
      }
      killEvent(ev);
    });
    _defineProperty(_assertThisInitialized(_this), "validatePosition", function (idx, proposedPosition) {
      var _this$state4 = _this.state,
        handlePos = _this$state4.handlePos,
        handleDimensions = _this$state4.handleDimensions;
      return Math.max(Math.min(proposedPosition, handlePos[idx + 1] !== undefined ? handlePos[idx + 1] - handleDimensions : PERCENT_FULL // 100% is the highest value
      ), handlePos[idx - 1] !== undefined ? handlePos[idx - 1] + handleDimensions : PERCENT_EMPTY // 0% is the lowest value
      );
    });
    _defineProperty(_assertThisInitialized(_this), "validateValues", function (proposedValues, props) {
      var _ref4 = props || _this.props,
        max = _ref4.max,
        min = _ref4.min;
      return proposedValues.map(function (value, idx, values) {
        var realValue = Math.max(Math.min(value, max), min);
        if (values.length && realValue < values[idx - 1]) {
          return values[idx - 1];
        }
        return realValue;
      });
    });
    _defineProperty(_assertThisInitialized(_this), "canMove", function (idx, proposedPosition) {
      var _this$state5 = _this.state,
        handlePos = _this$state5.handlePos,
        handleDimensions = _this$state5.handleDimensions;
      if (proposedPosition < PERCENT_EMPTY) return false;
      if (proposedPosition > PERCENT_FULL) return false;
      var nextHandlePosition = handlePos[idx + 1] !== undefined ? handlePos[idx + 1] - handleDimensions : Infinity;
      if (proposedPosition > nextHandlePosition) return false;
      var prevHandlePosition = handlePos[idx - 1] !== undefined ? handlePos[idx - 1] + handleDimensions : -Infinity;
      if (proposedPosition < prevHandlePosition) return false;
      return true;
    });
    _defineProperty(_assertThisInitialized(_this), "fireChangeEvent", function () {
      var onChange = _this.props.onChange;
      if (onChange) onChange(_this.getPublicState());
    });
    _defineProperty(_assertThisInitialized(_this), "slideTo", function (idx, proposedPosition, onAfterSet) {
      var nextState = _this.getNextState(idx, proposedPosition);
      _this.setState(nextState, function () {
        var onValuesUpdated = _this.props.onValuesUpdated;
        if (onValuesUpdated) onValuesUpdated(_this.getPublicState());
        if (onAfterSet) onAfterSet();
      });
    });
    _defineProperty(_assertThisInitialized(_this), "updateNewValues", function (nextProps) {
      var slidingIndex = _this.state.slidingIndex;

      // Don't update while the slider is sliding
      if (slidingIndex !== null) {
        return;
      }
      var max = nextProps.max,
        min = nextProps.min,
        values = nextProps.values;
      var nextValues = _this.validateValues(values, nextProps);
      _this.setState({
        handlePos: nextValues.map(function (value) {
          return getPosition(value, min, max);
        }),
        values: nextValues
      }, function () {
        return _this.fireChangeEvent();
      });
    });
    _defineProperty(_assertThisInitialized(_this), "render", function () {
      var _ref5 = _this.props,
        children = _ref5.children,
        disabled = _ref5.disabled,
        Handle = _ref5.handle,
        max = _ref5.max,
        min = _ref5.min,
        orientation = _ref5.orientation,
        PitComponent = _ref5.pitComponent,
        pitPoints = _ref5.pitPoints,
        ProgressBar = _ref5.progressBar; // all required thanks to defaultProps
      var _this$state6 = _this.state,
        className = _this$state6.className,
        handlePos = _this$state6.handlePos,
        values = _this$state6.values;
      return h("div", {
        className: className,
        ref: _this.rheostat,
        onClick: disabled ? undefined : _this.handleClick,
        style: {
          position: 'relative'
        }
      }, _ref6, handlePos.map(function (pos, idx) {
        var handleStyle = orientation === 'vertical' ? {
          top: "".concat(pos, "%"),
          position: 'absolute'
        } : {
          left: "".concat(pos, "%"),
          position: 'absolute'
        };
        return h(Handle, {
          "aria-valuemax": _this.getMaxValue(idx),
          "aria-valuemin": _this.getMinValue(idx),
          "aria-valuenow": values[idx],
          "aria-disabled": disabled,
          "data-handle-key": idx,
          className: "rheostat-handle",
          key: "handle-".concat(idx),
          onClick: killEvent,
          onKeyDown: disabled ? undefined : _this.handleKeydown,
          onMouseDown: disabled ? undefined : _this.startMouseSlide,
          onTouchStart: disabled ? undefined : _this.startTouchSlide,
          role: "slider",
          style: handleStyle,
          tabIndex: 0
        });
      }), handlePos.map(function (_node, idx, arr) {
        if (idx === 0 && arr.length > 1) {
          return null;
        }
        return h(ProgressBar, {
          className: "rheostat-progress",
          key: "progress-bar-".concat(idx),
          style: _this.getProgressStyle(idx)
        });
      }), PitComponent && pitPoints.map(function (n) {
        var pos = getPosition(n, min, max);
        var pitStyle = orientation === 'vertical' ? {
          top: "".concat(pos, "%"),
          position: 'absolute'
        } : {
          left: "".concat(pos, "%"),
          position: 'absolute'
        };
        return h(PitComponent, {
          key: "pit-".concat(n),
          style: pitStyle
        }, n);
      }), children);
    });
    return _this;
  }
  return _createClass(Rheostat);
}(Component);
_defineProperty(Rheostat, "defaultProps", {
  className: '',
  children: null,
  disabled: false,
  handle: Button,
  max: PERCENT_FULL,
  min: PERCENT_EMPTY,
  onClick: null,
  onChange: null,
  onKeyPress: null,
  onSliderDragEnd: null,
  onSliderDragMove: null,
  onSliderDragStart: null,
  onValuesUpdated: null,
  orientation: 'horizontal',
  pitComponent: null,
  pitPoints: [],
  progressBar: 'div',
  snap: false,
  snapPoints: [],
  values: [PERCENT_EMPTY]
});
export default Rheostat;