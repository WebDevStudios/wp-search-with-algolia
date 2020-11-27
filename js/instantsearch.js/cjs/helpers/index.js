"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  highlight: true,
  snippet: true,
  insights: true
};
Object.defineProperty(exports, "highlight", {
  enumerable: true,
  get: function get() {
    return _highlight.default;
  }
});
Object.defineProperty(exports, "snippet", {
  enumerable: true,
  get: function get() {
    return _snippet.default;
  }
});
Object.defineProperty(exports, "insights", {
  enumerable: true,
  get: function get() {
    return _insights.default;
  }
});

var _highlight = _interopRequireWildcard(require("./highlight"));

Object.keys(_highlight).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _highlight[key];
    }
  });
});

var _snippet = _interopRequireWildcard(require("./snippet"));

Object.keys(_snippet).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _snippet[key];
    }
  });
});

var _insights = _interopRequireDefault(require("./insights"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }