"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preactCompat = _interopRequireDefault(require("preact-compat"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Template = _interopRequireDefault(require("../Template/Template"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Stats = function Stats(_ref) {
  var nbHits = _ref.nbHits,
      hitsPerPage = _ref.hitsPerPage,
      nbPages = _ref.nbPages,
      page = _ref.page,
      processingTimeMS = _ref.processingTimeMS,
      query = _ref.query,
      templateProps = _ref.templateProps,
      cssClasses = _ref.cssClasses;
  return _preactCompat.default.createElement("div", {
    className: cssClasses.root
  }, _preactCompat.default.createElement(_Template.default, _extends({}, templateProps, {
    templateKey: "text",
    rootTagName: "span",
    rootProps: {
      className: cssClasses.text
    },
    data: {
      hasManyResults: nbHits > 1,
      hasNoResults: nbHits === 0,
      hasOneResult: nbHits === 1,
      hitsPerPage: hitsPerPage,
      nbHits: nbHits,
      nbPages: nbPages,
      page: page,
      processingTimeMS: processingTimeMS,
      query: query,
      cssClasses: cssClasses
    }
  })));
};

var _default = Stats;
exports.default = _default;