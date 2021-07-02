"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  highlight: true,
  reverseHighlight: true,
  snippet: true,
  reverseSnippet: true,
  insights: true,
  getInsightsAnonymousUserToken: true,
  getInsightsAnonymousUserTokenInternal: true
};
Object.defineProperty(exports, "highlight", {
  enumerable: true,
  get: function get() {
    return _highlight.default;
  }
});
Object.defineProperty(exports, "reverseHighlight", {
  enumerable: true,
  get: function get() {
    return _reverseHighlight.default;
  }
});
Object.defineProperty(exports, "snippet", {
  enumerable: true,
  get: function get() {
    return _snippet.default;
  }
});
Object.defineProperty(exports, "reverseSnippet", {
  enumerable: true,
  get: function get() {
    return _reverseSnippet.default;
  }
});
Object.defineProperty(exports, "insights", {
  enumerable: true,
  get: function get() {
    return _insights.default;
  }
});
Object.defineProperty(exports, "getInsightsAnonymousUserToken", {
  enumerable: true,
  get: function get() {
    return _getInsightsAnonymousUserToken.default;
  }
});
Object.defineProperty(exports, "getInsightsAnonymousUserTokenInternal", {
  enumerable: true,
  get: function get() {
    return _getInsightsAnonymousUserToken.getInsightsAnonymousUserTokenInternal;
  }
});

var _highlight = _interopRequireWildcard(require("./highlight"));

Object.keys(_highlight).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _highlight[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _highlight[key];
    }
  });
});

var _reverseHighlight = _interopRequireWildcard(require("./reverseHighlight"));

Object.keys(_reverseHighlight).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _reverseHighlight[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _reverseHighlight[key];
    }
  });
});

var _snippet = _interopRequireWildcard(require("./snippet"));

Object.keys(_snippet).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _snippet[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _snippet[key];
    }
  });
});

var _reverseSnippet = _interopRequireWildcard(require("./reverseSnippet"));

Object.keys(_reverseSnippet).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _reverseSnippet[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _reverseSnippet[key];
    }
  });
});

var _insights = _interopRequireDefault(require("./insights"));

var _getInsightsAnonymousUserToken = _interopRequireWildcard(require("./get-insights-anonymous-user-token"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }