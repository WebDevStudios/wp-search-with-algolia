"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var defaultTemplates = {
  text: '',
  button: function button(_ref) {
    var isRelevantSorted = _ref.isRelevantSorted;
    return isRelevantSorted ? 'See all results' : 'See relevant results';
  }
};
var _default = defaultTemplates;
exports.default = _default;