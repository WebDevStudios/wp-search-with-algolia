"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
Object.defineProperty(exports, "highlight", {
  enumerable: true,
  get: function get() {
    return _highlight.default;
  }
});
Object.defineProperty(exports, "insights", {
  enumerable: true,
  get: function get() {
    return _insights.default;
  }
});
Object.defineProperty(exports, "reverseHighlight", {
  enumerable: true,
  get: function get() {
    return _reverseHighlight.default;
  }
});
Object.defineProperty(exports, "reverseSnippet", {
  enumerable: true,
  get: function get() {
    return _reverseSnippet.default;
  }
});
Object.defineProperty(exports, "snippet", {
  enumerable: true,
  get: function get() {
    return _snippet.default;
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
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }