"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  text: '',
  button: function button(_ref) {
    var isRelevantSorted = _ref.isRelevantSorted;
    return isRelevantSorted ? 'See all results' : 'See relevant results';
  }
};
exports.default = _default;