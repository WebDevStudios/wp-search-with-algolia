"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readDataAttributes = readDataAttributes;
exports.hasDataAttributes = hasDataAttributes;
exports.writeDataAttributes = writeDataAttributes;
exports.default = insights;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function readDataAttributes(domElement) {
  var method = domElement.getAttribute('data-insights-method');
  var serializedPayload = domElement.getAttribute('data-insights-payload');

  if (typeof serializedPayload !== 'string') {
    throw new Error('The insights helper expects `data-insights-payload` to be a base64-encoded JSON string.');
  }

  try {
    var payload = JSON.parse(atob(serializedPayload));
    return {
      method: method,
      payload: payload
    };
  } catch (error) {
    throw new Error('The insights helper was unable to parse `data-insights-payload`.');
  }
}

function hasDataAttributes(domElement) {
  return domElement.hasAttribute('data-insights-method');
}

function writeDataAttributes(_ref) {
  var method = _ref.method,
      payload = _ref.payload;

  if (_typeof(payload) !== 'object') {
    throw new Error("The insights helper expects the payload to be an object.");
  }

  var serializedPayload;

  try {
    serializedPayload = btoa(JSON.stringify(payload));
  } catch (error) {
    throw new Error("Could not JSON serialize the payload object.");
  }

  return "data-insights-method=\"".concat(method, "\" data-insights-payload=\"").concat(serializedPayload, "\"");
}

function insights(method, payload) {
  return writeDataAttributes({
    method: method,
    payload: payload
  });
}