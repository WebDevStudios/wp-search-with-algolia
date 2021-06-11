'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;

var _preact = require('preact');

var EmptyComponent = function EmptyComponent() {
  return null;
};

var unmountComponentAtNode = function unmountComponentAtNode(container) {
  (0, _preact.render)(EmptyComponent, container);
};

var _default = unmountComponentAtNode;
exports.default = _default;
