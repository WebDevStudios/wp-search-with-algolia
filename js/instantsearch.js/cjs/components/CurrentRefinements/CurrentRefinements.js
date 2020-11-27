"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preactCompat = _interopRequireDefault(require("preact-compat"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("../../lib/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createItemKey = function createItemKey(_ref) {
  var attribute = _ref.attribute,
      value = _ref.value,
      type = _ref.type,
      operator = _ref.operator;
  return [attribute, type, value, operator].map(function (key) {
    return key;
  }).filter(Boolean).join(':');
};

var handleClick = function handleClick(callback) {
  return function (event) {
    if ((0, _utils.isSpecialClick)(event)) {
      return;
    }

    event.preventDefault();
    callback();
  };
};

var CurrentRefinements = function CurrentRefinements(_ref2) {
  var items = _ref2.items,
      cssClasses = _ref2.cssClasses;
  return _preactCompat.default.createElement("div", {
    className: cssClasses.root
  }, _preactCompat.default.createElement("ul", {
    className: cssClasses.list
  }, items.map(function (item, index) {
    return _preactCompat.default.createElement("li", {
      key: "".concat(item.attribute, "-").concat(index),
      className: cssClasses.item
    }, _preactCompat.default.createElement("span", {
      className: cssClasses.label
    }, (0, _utils.capitalize)(item.label), ":"), item.refinements.map(function (refinement) {
      return _preactCompat.default.createElement("span", {
        key: createItemKey(refinement),
        className: cssClasses.category
      }, _preactCompat.default.createElement("span", {
        className: cssClasses.categoryLabel
      }, refinement.attribute === 'query' ? _preactCompat.default.createElement("q", null, refinement.label) : refinement.label), _preactCompat.default.createElement("button", {
        className: cssClasses.delete,
        onClick: handleClick(item.refine.bind(null, refinement))
      }, "\u2715"));
    }));
  })));
};

var _default = CurrentRefinements;
exports.default = _default;