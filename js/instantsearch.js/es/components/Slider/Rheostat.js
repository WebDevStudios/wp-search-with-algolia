function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * This is a fork of Rheostat for Preact X.
 *
 * @see https://github.com/airbnb/rheostat
 */

/** @jsx h */
import { h, Component, createRef } from 'preact';
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
} // Preact doesn't have builtin types for Style, JSX.HTMLAttributes['style'] is just object
// maybe migrate to csstype later?


var _ref6 = h("div", {
  className: "rheostat-background"
});

var Rheostat = /*#__PURE__*/function (_Component) {
  _inherits(Rheostat, _Component);

  var _super = _createSuper(Rheostat);

  function Rheostat(props) {
    var _this;

    _classCallCheck(this, Rheostat);

    _this = _super.call(this, props);

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

    _this.getPublicState = _this.getPublicState.bind(_assertThisInitialized(_this));
    _this.getSliderBoundingBox = _this.getSliderBoundingBox.bind(_assertThisInitialized(_this));
    _this.getProgressStyle = _this.getProgressStyle.bind(_assertThisInitialized(_this));
    _this.getMinValue = _this.getMinValue.bind(_assertThisInitialized(_this));
    _this.getMaxValue = _this.getMaxValue.bind(_assertThisInitialized(_this));
    _this.getHandleDimensions = _this.getHandleDimensions.bind(_assertThisInitialized(_this));
    _this.getClosestSnapPoint = _this.getClosestSnapPoint.bind(_assertThisInitialized(_this));
    _this.getSnapPosition = _this.getSnapPosition.bind(_assertThisInitialized(_this));
    _this.getNextPositionForKey = _this.getNextPositionForKey.bind(_assertThisInitialized(_this));
    _this.getNextState = _this.getNextState.bind(_assertThisInitialized(_this));
    _this.handleClick = _this.handleClick.bind(_assertThisInitialized(_this));
    _this.getClosestHandle = _this.getClosestHandle.bind(_assertThisInitialized(_this));
    _this.setStartSlide = _this.setStartSlide.bind(_assertThisInitialized(_this));
    _this.startMouseSlide = _this.startMouseSlide.bind(_assertThisInitialized(_this));
    _this.startTouchSlide = _this.startTouchSlide.bind(_assertThisInitialized(_this));
    _this.handleMouseSlide = _this.handleMouseSlide.bind(_assertThisInitialized(_this));
    _this.handleTouchSlide = _this.handleTouchSlide.bind(_assertThisInitialized(_this));
    _this.handleSlide = _this.handleSlide.bind(_assertThisInitialized(_this));
    _this.endSlide = _this.endSlide.bind(_assertThisInitialized(_this));
    _this.handleKeydown = _this.handleKeydown.bind(_assertThisInitialized(_this));
    _this.validatePosition = _this.validatePosition.bind(_assertThisInitialized(_this));
    _this.validateValues = _this.validateValues.bind(_assertThisInitialized(_this));
    _this.canMove = _this.canMove.bind(_assertThisInitialized(_this));
    _this.fireChangeEvent = _this.fireChangeEvent.bind(_assertThisInitialized(_this));
    _this.slideTo = _this.slideTo.bind(_assertThisInitialized(_this));
    _this.updateNewValues = _this.updateNewValues.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Rheostat, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var _this$props = this.props,
          className = _this$props.className,
          disabled = _this$props.disabled,
          min = _this$props.min,
          max = _this$props.max,
          orientation = _this$props.orientation;
      var _this$state = this.state,
          values = _this$state.values,
          slidingIndex = _this$state.slidingIndex;
      var minMaxChanged = nextProps.min !== min || nextProps.max !== max;
      var valuesChanged = values.length !== nextProps.values.length || values.some(function (value, idx) {
        return nextProps.values[idx] !== value;
      });
      var orientationChanged = nextProps.className !== className || nextProps.orientation !== orientation;
      var willBeDisabled = nextProps.disabled && !disabled;

      if (orientationChanged) {
        this.setState({
          className: getClassName(nextProps)
        });
      }

      if (minMaxChanged || valuesChanged) this.updateNewValues(nextProps);

      if (willBeDisabled && slidingIndex !== null) {
        this.endSlide();
      }
    }
  }, {
    key: "getPublicState",
    value: function getPublicState() {
      var _this$props2 = this.props,
          min = _this$props2.min,
          max = _this$props2.max;
      var values = this.state.values;
      return {
        max: max,
        min: min,
        values: values
      };
    }
  }, {
    key: "getSliderBoundingBox",
    value: function getSliderBoundingBox() {
      // only gets called after render, so it will always be defined
      var node = this.rheostat.current;
      var rect = node.getBoundingClientRect();
      return {
        height: rect.height || node.clientHeight,
        left: rect.left,
        top: rect.top,
        width: rect.width || node.clientWidth
      };
    }
  }, {
    key: "getProgressStyle",
    value: function getProgressStyle(idx) {
      var handlePos = this.state.handlePos;
      var value = handlePos[idx];

      if (idx === 0) {
        return this.props.orientation === 'vertical' ? {
          height: "".concat(value, "%"),
          top: 0
        } : {
          left: 0,
          width: "".concat(value, "%")
        };
      }

      var prevValue = handlePos[idx - 1];
      var diffValue = value - prevValue;
      return this.props.orientation === 'vertical' ? {
        height: "".concat(diffValue, "%"),
        top: "".concat(prevValue, "%")
      } : {
        left: "".concat(prevValue, "%"),
        width: "".concat(diffValue, "%")
      };
    }
  }, {
    key: "getMinValue",
    value: function getMinValue(idx) {
      return this.state.values[idx - 1] ? Math.max(this.props.min, this.state.values[idx - 1]) : this.props.min;
    }
  }, {
    key: "getMaxValue",
    value: function getMaxValue(idx) {
      return this.state.values[idx + 1] ? Math.min(this.props.max, this.state.values[idx + 1]) : this.props.max;
    }
  }, {
    key: "getHandleDimensions",
    value: function getHandleDimensions(ev, sliderBox) {
      var handleNode = ev.currentTarget || null;
      if (!handleNode) return 0;
      return this.props.orientation === 'vertical' ? handleNode.clientHeight / sliderBox.height * PERCENT_FULL / 2 : handleNode.clientWidth / sliderBox.width * PERCENT_FULL / 2;
    }
  }, {
    key: "getClosestSnapPoint",
    value: function getClosestSnapPoint(value) {
      // non-null thanks to defaultProps
      if (!this.props.snapPoints.length) return value;
      return this.props.snapPoints.reduce(function (snapTo, snap) {
        return Math.abs(snapTo - value) < Math.abs(snap - value) ? snapTo : snap;
      });
    }
  }, {
    key: "getSnapPosition",
    value: function getSnapPosition(positionPercent) {
      if (!this.props.snap) return positionPercent;
      var _ref = this.props,
          max = _ref.max,
          min = _ref.min;
      var value = getValue(positionPercent, min, max);
      var snapValue = this.getClosestSnapPoint(value);
      return getPosition(snapValue, min, max);
    }
  }, {
    key: "getNextPositionForKey",
    value: function getNextPositionForKey(idx, keyCode) {
      var _stepMultiplier;

      var _this$state2 = this.state,
          handlePos = _this$state2.handlePos,
          values = _this$state2.values;
      var _ref2 = this.props,
          max = _ref2.max,
          min = _ref2.min,
          snapPoints = _ref2.snapPoints;
      var shouldSnap = this.props.snap;
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
        currentIndex = snapPoints.indexOf(this.getClosestSnapPoint(values[idx]));
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
          if (!currentIndex) {// nothing happens
          } else if (proposedPercentage > originalPercentage) {
            // move cursor right unless overflow
            if (currentIndex < snapPoints.length - 1) {
              proposedValue = snapPoints[currentIndex + 1];
            } // move cursor left unless there is overflow

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
    }
  }, {
    key: "getNextState",
    value: function getNextState(idx, proposedPosition) {
      var handlePos = this.state.handlePos;
      var _ref3 = this.props,
          max = _ref3.max,
          min = _ref3.min;
      var actualPosition = this.validatePosition(idx, proposedPosition);
      var nextHandlePos = handlePos.map(function (pos, index) {
        return index === idx ? actualPosition : pos;
      });
      return {
        handlePos: nextHandlePos,
        values: nextHandlePos.map(function (pos) {
          return getValue(pos, min, max);
        })
      };
    }
  }, {
    key: "getClosestHandle",
    value: function getClosestHandle(positionPercent) {
      var handlePos = this.state.handlePos;
      return handlePos.reduce(function (closestIdx, _node, idx) {
        var challenger = Math.abs(handlePos[idx] - positionPercent);
        var current = Math.abs(handlePos[closestIdx] - positionPercent);
        return challenger < current ? idx : closestIdx;
      }, 0);
    }
  }, {
    key: "setStartSlide",
    value: function setStartSlide(ev, x, y) {
      var sliderBox = this.getSliderBoundingBox();
      this.setState({
        handleDimensions: this.getHandleDimensions(ev, sliderBox),
        mousePos: {
          x: x,
          y: y
        },
        sliderBox: sliderBox,
        slidingIndex: getHandleFor(ev)
      });
    }
  }, {
    key: "startMouseSlide",
    value: function startMouseSlide(ev) {
      this.setStartSlide(ev, ev.clientX, ev.clientY);
      document.addEventListener('mousemove', this.handleMouseSlide, false);
      document.addEventListener('mouseup', this.endSlide, false);
      killEvent(ev);
    }
  }, {
    key: "startTouchSlide",
    value: function startTouchSlide(ev) {
      if (ev.changedTouches.length > 1) return;
      var touch = ev.changedTouches[0];
      this.setStartSlide(ev, touch.clientX, touch.clientY);
      document.addEventListener('touchmove', this.handleTouchSlide, false);
      document.addEventListener('touchend', this.endSlide, false);
      if (this.props.onSliderDragStart) this.props.onSliderDragStart();
      killEvent(ev);
    }
  }, {
    key: "handleMouseSlide",
    value: function handleMouseSlide(ev) {
      if (this.state.slidingIndex === null) return;
      this.handleSlide(ev.clientX, ev.clientY);
      killEvent(ev);
    }
  }, {
    key: "handleTouchSlide",
    value: function handleTouchSlide(ev) {
      if (this.state.slidingIndex === null) return;

      if (ev.changedTouches.length > 1) {
        this.endSlide();
        return;
      }

      var touch = ev.changedTouches[0];
      this.handleSlide(touch.clientX, touch.clientY);
      killEvent(ev);
    }
  }, {
    key: "handleSlide",
    value: function handleSlide(x, y) {
      var _this$state3 = this.state,
          idx = _this$state3.slidingIndex,
          sliderBox = _this$state3.sliderBox;
      var positionPercent = this.props.orientation === 'vertical' ? (y - sliderBox.top) / sliderBox.height * PERCENT_FULL : (x - sliderBox.left) / sliderBox.width * PERCENT_FULL;
      this.slideTo(idx, positionPercent);

      if (this.canMove(idx, positionPercent)) {
        // update mouse positions
        this.setState({
          mousePos: {
            x: x,
            y: y
          }
        });
        if (this.props.onSliderDragMove) this.props.onSliderDragMove();
      }
    }
  }, {
    key: "endSlide",
    value: function endSlide() {
      var _this2 = this;

      var idx = this.state.slidingIndex;
      this.setState({
        slidingIndex: null
      });
      document.removeEventListener('mouseup', this.endSlide, false);
      document.removeEventListener('touchend', this.endSlide, false);
      document.removeEventListener('touchmove', this.handleTouchSlide, false);
      document.removeEventListener('mousemove', this.handleMouseSlide, false);
      if (this.props.onSliderDragEnd) this.props.onSliderDragEnd();

      if (this.props.snap) {
        var positionPercent = this.getSnapPosition(this.state.handlePos[idx]);
        this.slideTo(idx, positionPercent, function () {
          return _this2.fireChangeEvent();
        });
      } else {
        this.fireChangeEvent();
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(ev) {
      var _this3 = this;

      if (ev.target.getAttribute('data-handle-key')) {
        return;
      } // Calculate the position of the slider on the page so we can determine
      // the position where you click in relativity.


      var sliderBox = this.getSliderBoundingBox();
      var positionDecimal = this.props.orientation === 'vertical' ? (ev.clientY - sliderBox.top) / sliderBox.height : (ev.clientX - sliderBox.left) / sliderBox.width;
      var positionPercent = positionDecimal * PERCENT_FULL;
      var handleId = this.getClosestHandle(positionPercent);
      var validPositionPercent = this.getSnapPosition(positionPercent); // Move the handle there

      this.slideTo(handleId, validPositionPercent, function () {
        return _this3.fireChangeEvent();
      });
      if (this.props.onClick) this.props.onClick();
    }
  }, {
    key: "handleKeydown",
    value: function handleKeydown(ev) {
      var _this4 = this;

      var idx = getHandleFor(ev);

      if (ev.keyCode === KEYS.ESC) {
        ev.currentTarget.blur();
        return;
      }

      var proposedPercentage = this.getNextPositionForKey(idx, ev.keyCode);
      if (proposedPercentage === null) return;

      if (this.canMove(idx, proposedPercentage)) {
        this.slideTo(idx, proposedPercentage, function () {
          return _this4.fireChangeEvent();
        });
        if (this.props.onKeyPress) this.props.onKeyPress();
      }

      killEvent(ev);
    } // Make sure the proposed position respects the bounds and
    // does not collide with other handles too much.

  }, {
    key: "validatePosition",
    value: function validatePosition(idx, proposedPosition) {
      var _this$state4 = this.state,
          handlePos = _this$state4.handlePos,
          handleDimensions = _this$state4.handleDimensions;
      return Math.max(Math.min(proposedPosition, handlePos[idx + 1] !== undefined ? handlePos[idx + 1] - handleDimensions : PERCENT_FULL // 100% is the highest value
      ), handlePos[idx - 1] !== undefined ? handlePos[idx - 1] + handleDimensions : PERCENT_EMPTY // 0% is the lowest value
      );
    }
  }, {
    key: "validateValues",
    value: function validateValues(proposedValues, props) {
      var _ref4 = props || this.props,
          max = _ref4.max,
          min = _ref4.min;

      return proposedValues.map(function (value, idx, values) {
        var realValue = Math.max(Math.min(value, max), min);

        if (values.length && realValue < values[idx - 1]) {
          return values[idx - 1];
        }

        return realValue;
      });
    }
  }, {
    key: "canMove",
    value: function canMove(idx, proposedPosition) {
      var _this$state5 = this.state,
          handlePos = _this$state5.handlePos,
          handleDimensions = _this$state5.handleDimensions;
      if (proposedPosition < PERCENT_EMPTY) return false;
      if (proposedPosition > PERCENT_FULL) return false;
      var nextHandlePosition = handlePos[idx + 1] !== undefined ? handlePos[idx + 1] - handleDimensions : Infinity;
      if (proposedPosition > nextHandlePosition) return false;
      var prevHandlePosition = handlePos[idx - 1] !== undefined ? handlePos[idx - 1] + handleDimensions : -Infinity;
      if (proposedPosition < prevHandlePosition) return false;
      return true;
    }
  }, {
    key: "fireChangeEvent",
    value: function fireChangeEvent() {
      var onChange = this.props.onChange;
      if (onChange) onChange(this.getPublicState());
    }
  }, {
    key: "slideTo",
    value: function slideTo(idx, proposedPosition, onAfterSet) {
      var _this5 = this;

      var nextState = this.getNextState(idx, proposedPosition);
      this.setState(nextState, function () {
        var onValuesUpdated = _this5.props.onValuesUpdated;
        if (onValuesUpdated) onValuesUpdated(_this5.getPublicState());
        if (onAfterSet) onAfterSet();
      });
    }
  }, {
    key: "updateNewValues",
    value: function updateNewValues(nextProps) {
      var _this6 = this;

      var slidingIndex = this.state.slidingIndex; // Don't update while the slider is sliding

      if (slidingIndex !== null) {
        return;
      }

      var max = nextProps.max,
          min = nextProps.min,
          values = nextProps.values;
      var nextValues = this.validateValues(values, nextProps);
      this.setState({
        handlePos: nextValues.map(function (value) {
          return getPosition(value, min, max);
        }),
        values: nextValues
      }, function () {
        return _this6.fireChangeEvent();
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this7 = this;

      var _ref5 = this.props,
          children = _ref5.children,
          disabled = _ref5.disabled,
          Handle = _ref5.handle,
          max = _ref5.max,
          min = _ref5.min,
          orientation = _ref5.orientation,
          PitComponent = _ref5.pitComponent,
          pitPoints = _ref5.pitPoints,
          ProgressBar = _ref5.progressBar; // all required thanks to defaultProps

      var _this$state6 = this.state,
          className = _this$state6.className,
          handlePos = _this$state6.handlePos,
          values = _this$state6.values;
      return h("div", {
        className: className,
        ref: this.rheostat,
        onClick: disabled ? undefined : this.handleClick,
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
          "aria-valuemax": _this7.getMaxValue(idx),
          "aria-valuemin": _this7.getMinValue(idx),
          "aria-valuenow": values[idx],
          "aria-disabled": disabled,
          "data-handle-key": idx,
          className: "rheostat-handle",
          key: "handle-".concat(idx),
          onClick: killEvent,
          onKeyDown: disabled ? undefined : _this7.handleKeydown,
          onMouseDown: disabled ? undefined : _this7.startMouseSlide,
          onTouchStart: disabled ? undefined : _this7.startTouchSlide,
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
          style: _this7.getProgressStyle(idx)
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
    }
  }]);

  return Rheostat;
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