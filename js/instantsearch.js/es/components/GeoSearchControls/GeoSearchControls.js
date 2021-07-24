function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** @jsx h */
import { h, Fragment } from 'preact';
import cx from 'classnames';
import Template from '../Template/Template';
import GeoSearchButton from './GeoSearchButton';
import GeoSearchToggle from './GeoSearchToggle';

var GeoSearchControls = function GeoSearchControls(_ref) {
  var cssClasses = _ref.cssClasses,
      enableRefine = _ref.enableRefine,
      enableRefineControl = _ref.enableRefineControl,
      enableClearMapRefinement = _ref.enableClearMapRefinement,
      isRefineOnMapMove = _ref.isRefineOnMapMove,
      isRefinedWithMap = _ref.isRefinedWithMap,
      hasMapMoveSinceLastRefine = _ref.hasMapMoveSinceLastRefine,
      onRefineToggle = _ref.onRefineToggle,
      onRefineClick = _ref.onRefineClick,
      onClearClick = _ref.onClearClick,
      templateProps = _ref.templateProps;
  return h(Fragment, null, enableRefine && h("div", null, enableRefineControl && h("div", {
    className: cssClasses.control
  }, isRefineOnMapMove || !hasMapMoveSinceLastRefine ? h(GeoSearchToggle, {
    classNameLabel: cx(cssClasses.label, _defineProperty({}, cssClasses.selectedLabel, isRefineOnMapMove)),
    classNameInput: cssClasses.input,
    checked: isRefineOnMapMove,
    onToggle: onRefineToggle
  }, h(Template, _extends({}, templateProps, {
    templateKey: "toggle",
    rootTagName: "span"
  }))) : h(GeoSearchButton, {
    className: cssClasses.redo,
    disabled: !hasMapMoveSinceLastRefine,
    onClick: onRefineClick
  }, h(Template, _extends({}, templateProps, {
    templateKey: "redo",
    rootTagName: "span"
  })))), !enableRefineControl && !isRefineOnMapMove && h("div", {
    className: cssClasses.control
  }, h(GeoSearchButton, {
    className: cx(cssClasses.redo, _defineProperty({}, cssClasses.disabledRedo, !hasMapMoveSinceLastRefine)),
    disabled: !hasMapMoveSinceLastRefine,
    onClick: onRefineClick
  }, h(Template, _extends({}, templateProps, {
    templateKey: "redo",
    rootTagName: "span"
  })))), enableClearMapRefinement && isRefinedWithMap && h(GeoSearchButton, {
    className: cssClasses.reset,
    onClick: onClearClick
  }, h(Template, _extends({}, templateProps, {
    templateKey: "reset",
    rootTagName: "span"
  })))));
};

export default GeoSearchControls;