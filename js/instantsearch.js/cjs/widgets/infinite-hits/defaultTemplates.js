"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  empty: 'No results',
  showPreviousText: 'Show previous results',
  showMoreText: 'Show more results',
  item: function item(data) {
    return JSON.stringify(data, null, 2);
  }
};
exports.default = _default;