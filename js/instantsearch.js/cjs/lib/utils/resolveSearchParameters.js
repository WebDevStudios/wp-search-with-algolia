"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var resolveSearchParameters = function resolveSearchParameters(current) {
  var parent = current.getParent();
  var states = [current.getHelper().state];

  while (parent !== null) {
    states = [parent.getHelper().state].concat(states);
    parent = parent.getParent();
  }

  return states;
};

var _default = resolveSearchParameters;
exports.default = _default;