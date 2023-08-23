"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InternalHighlight = void 0;
var _uiComponentsHighlightVdom = require("@algolia/ui-components-highlight-vdom");
var _preact = require("preact");
var InternalHighlight = (0, _uiComponentsHighlightVdom.createHighlightComponent)({
  createElement: _preact.createElement,
  Fragment: _preact.Fragment
});
exports.InternalHighlight = InternalHighlight;