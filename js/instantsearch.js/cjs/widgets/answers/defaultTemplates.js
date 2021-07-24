"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var defaultTemplates = {
  header: '',
  loader: '',
  item: function item(_item) {
    return JSON.stringify(_item);
  }
};
var _default = defaultTemplates;
exports.default = _default;