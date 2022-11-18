function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import { cx } from '@algolia/ui-components-shared';
import { h } from 'preact';
import { InternalHighlight } from "../InternalHighlight/InternalHighlight.js";
export function Highlight(_ref) {
  var _ref$classNames = _ref.classNames,
      classNames = _ref$classNames === void 0 ? {} : _ref$classNames,
      props = _objectWithoutProperties(_ref, ["classNames"]);

  return h(InternalHighlight, _extends({
    classNames: {
      root: cx('ais-Highlight', classNames.root),
      highlighted: cx('ais-Highlight-highlighted', classNames.highlighted),
      nonHighlighted: cx('ais-Highlight-nonHighlighted', classNames.nonHighlighted),
      separator: cx('ais-Highlight-separator', classNames.separator)
    }
  }, props));
}