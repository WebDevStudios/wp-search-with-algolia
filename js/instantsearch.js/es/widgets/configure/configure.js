function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import connectConfigure from '../../connectors/configure/connectConfigure';
import { noop } from '../../lib/utils';
/**
 * A list of [search parameters](https://www.algolia.com/doc/api-reference/search-api-parameters/)
 * to enable when the widget mounts.
 */

var configure = function configure(widgetParams) {
  // This is a renderless widget that falls back to the connector's
  // noop render and unmount functions.
  var makeWidget = connectConfigure(noop);
  return _objectSpread(_objectSpread({}, makeWidget({
    searchParameters: widgetParams
  })), {}, {
    $$widgetType: 'ais.configure'
  });
};

export default configure;