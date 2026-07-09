function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
import { range } from "../../lib/utils/index.js";
var Paginator = /*#__PURE__*/function () {
  function Paginator(params) {
    _classCallCheck(this, Paginator);
    _defineProperty(this, "currentPage", void 0);
    _defineProperty(this, "total", void 0);
    _defineProperty(this, "padding", void 0);
    this.currentPage = params.currentPage;
    this.total = params.total;
    this.padding = params.padding;
  }
  _createClass(Paginator, [{
    key: "pages",
    value: function pages() {
      var total = this.total,
        currentPage = this.currentPage,
        padding = this.padding;
      if (total === 0) return [0];
      var totalDisplayedPages = this.nbPagesDisplayed(padding, total);
      if (totalDisplayedPages === total) {
        return range({
          end: total
        });
      }
      var paddingLeft = this.calculatePaddingLeft(currentPage, padding, total, totalDisplayedPages);
      var paddingRight = totalDisplayedPages - paddingLeft;
      var first = currentPage - paddingLeft;
      var last = currentPage + paddingRight;
      return range({
        start: first,
        end: last
      });
    }
  }, {
    key: "nbPagesDisplayed",
    value: function nbPagesDisplayed(padding, total) {
      return Math.min(2 * padding + 1, total);
    }
  }, {
    key: "calculatePaddingLeft",
    value: function calculatePaddingLeft(current, padding, total, totalDisplayedPages) {
      if (current <= padding) {
        return current;
      }
      if (current >= total - padding) {
        return totalDisplayedPages - (total - current);
      }
      return padding;
    }
  }, {
    key: "isLastPage",
    value: function isLastPage() {
      return this.currentPage >= this.total - 1;
    }
  }, {
    key: "isFirstPage",
    value: function isFirstPage() {
      return this.currentPage <= 0;
    }
  }]);
  return Paginator;
}();
export default Paginator;