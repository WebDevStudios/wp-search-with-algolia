"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../../lib/utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
        return (0, _utils.range)({
          end: total
        });
      }

      var paddingLeft = this.calculatePaddingLeft(currentPage, padding, total, totalDisplayedPages);
      var paddingRight = totalDisplayedPages - paddingLeft;
      var first = currentPage - paddingLeft;
      var last = currentPage + paddingRight;
      return (0, _utils.range)({
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
      return this.currentPage === this.total - 1 || this.total === 0;
    }
  }, {
    key: "isFirstPage",
    value: function isFirstPage() {
      return this.currentPage === 0;
    }
  }]);

  return Paginator;
}();

var _default = Paginator;
exports.default = _default;