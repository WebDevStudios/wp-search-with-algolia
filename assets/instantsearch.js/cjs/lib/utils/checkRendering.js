"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkRendering = checkRendering;

var _getObjectType = require("./getObjectType.js");

function checkRendering(rendering, usage) {
  if (rendering === undefined || typeof rendering !== 'function') {
    throw new Error("The render function is not valid (received type ".concat((0, _getObjectType.getObjectType)(rendering), ").\n\n").concat(usage));
  }
}