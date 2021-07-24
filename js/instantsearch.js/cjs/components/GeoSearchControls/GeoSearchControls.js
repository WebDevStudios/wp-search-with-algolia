"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

var _classnames = _interopRequireDefault(require("classnames"));

var _Template = _interopRequireDefault(require("../Template/Template"));

var _GeoSearchButton = _interopRequireDefault(require("./GeoSearchButton"));

var _GeoSearchToggle = _interopRequireDefault(require("./GeoSearchToggle"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GeoSearchControls = function GeoSearchControls(_ref) {
  var cssClasses = _ref.cssClasses,
      enableRefine = _ref.enableRefine,
      enableRefineControl = _ref.enableRefineControl,
      enableClearMapRefinement = _ref.enableClearMapRefinement,
      isRefineOnMapMove = _ref.isRefineOnMapMove,
      isRefinedWithMap = _ref.isRefinedWithMap,
      hasMapMoveSinceLastRefine = _ref.hasMapMoveSinceLastRefine,
      onRefineToggle = _ref.onRefineToggle,
      onRefineClick = _ref.onRefineClick,
      onClearClick = _ref.onClearClick,
      templateProps = _ref.templateProps;
  return (0, _preact.h)(_preact.Fragment, null, enableRefine && (0, _preact.h)("div", null, enableRefineControl && (0, _preact.h)("div", {
    className: cssClasses.control
  }, isRefineOnMapMove || !hasMapMoveSinceLastRefine ? (0, _preact.h)(_GeoSearchToggle.default, {
    classNameLabel: (0, _classnames.default)(cssClasses.label, _defineProperty({}, cssClasses.selectedLabel, isRefineOnMapMove)),
    classNameInput: cssClasses.input,
    checked: isRefineOnMapMove,
    onToggle: onRefineToggle
  }, (0, _preact.h)(_Template.default, _extends({}, templateProps, {
    templateKey: "toggle",
    rootTagName: "span"
  }))) : (0, _preact.h)(_GeoSearchButton.default, {
    className: cssClasses.redo,
    disabled: !hasMapMoveSinceLastRefine,
    onClick: onRefineClick
  }, (0, _preact.h)(_Template.default, _extends({}, templateProps, {
    templateKey: "redo",
    rootTagName: "span"
  })))), !enableRefineControl && !isRefineOnMapMove && (0, _preact.h)("div", {
    className: cssClasses.control
  }, (0, _preact.h)(_GeoSearchButton.default, {
    className: (0, _classnames.default)(cssClasses.redo, _defineProperty({}, cssClasses.disabledRedo, !hasMapMoveSinceLastRefine)),
    disabled: !hasMapMoveSinceLastRefine,
    onClick: onRefineClick
  }, (0, _preact.h)(_Template.default, _extends({}, templateProps, {
    templateKey: "redo",
    rootTagName: "span"
  })))), enableClearMapRefinement && isRefinedWithMap && (0, _preact.h)(_GeoSearchButton.default, {
    className: cssClasses.reset,
    onClick: onClearClick
  }, (0, _preact.h)(_Template.default, _extends({}, templateProps, {
    templateKey: "reset",
    rootTagName: "span"
  })))));
};

var _default = GeoSearchControls;
exports.default = _default;