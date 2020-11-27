"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "withInsights", {
  enumerable: true,
  get: function get() {
    return _client.default;
  }
});
Object.defineProperty(exports, "inferInsightsPayload", {
  enumerable: true,
  get: function get() {
    return _client.inferPayload;
  }
});
Object.defineProperty(exports, "withInsightsListener", {
  enumerable: true,
  get: function get() {
    return _listener.default;
  }
});

var _client = _interopRequireWildcard(require("./client"));

var _listener = _interopRequireDefault(require("./listener"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }