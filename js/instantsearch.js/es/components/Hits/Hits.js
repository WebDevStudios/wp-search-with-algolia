function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/** @jsx h */
import { h } from 'preact';
import cx from 'classnames';
import Template from '../Template/Template';

var Hits = function Hits(_ref) {
  var results = _ref.results,
      hits = _ref.hits,
      bindEvent = _ref.bindEvent,
      cssClasses = _ref.cssClasses,
      templateProps = _ref.templateProps;

  if (results.hits.length === 0) {
    return h(Template, _extends({}, templateProps, {
      templateKey: "empty",
      rootProps: {
        className: cx(cssClasses.root, cssClasses.emptyRoot)
      },
      data: results
    }));
  }

  return h("div", {
    className: cssClasses.root
  }, h("ol", {
    className: cssClasses.list
  }, hits.map(function (hit, index) {
    return h(Template, _extends({}, templateProps, {
      templateKey: "item",
      rootTagName: "li",
      rootProps: {
        className: cssClasses.item
      },
      key: hit.objectID,
      data: _objectSpread(_objectSpread({}, hit), {}, {
        __hitIndex: index
      }),
      bindEvent: bindEvent
    }));
  })));
};

Hits.defaultProps = {
  results: {
    hits: []
  },
  hits: []
};
export default Hits;