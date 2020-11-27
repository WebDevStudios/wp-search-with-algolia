import React from 'preact-compat';
import PropTypes from 'prop-types';
import { isSpecialClick, capitalize } from '../../lib/utils';

var createItemKey = function createItemKey(_ref) {
  var attribute = _ref.attribute,
      value = _ref.value,
      type = _ref.type,
      operator = _ref.operator;
  return [attribute, type, value, operator].map(function (key) {
    return key;
  }).filter(Boolean).join(':');
};

var handleClick = function handleClick(callback) {
  return function (event) {
    if (isSpecialClick(event)) {
      return;
    }

    event.preventDefault();
    callback();
  };
};

var CurrentRefinements = function CurrentRefinements(_ref2) {
  var items = _ref2.items,
      cssClasses = _ref2.cssClasses;
  return React.createElement("div", {
    className: cssClasses.root
  }, React.createElement("ul", {
    className: cssClasses.list
  }, items.map(function (item, index) {
    return React.createElement("li", {
      key: "".concat(item.attribute, "-").concat(index),
      className: cssClasses.item
    }, React.createElement("span", {
      className: cssClasses.label
    }, capitalize(item.label), ":"), item.refinements.map(function (refinement) {
      return React.createElement("span", {
        key: createItemKey(refinement),
        className: cssClasses.category
      }, React.createElement("span", {
        className: cssClasses.categoryLabel
      }, refinement.attribute === 'query' ? React.createElement("q", null, refinement.label) : refinement.label), React.createElement("button", {
        className: cssClasses.delete,
        onClick: handleClick(item.refine.bind(null, refinement))
      }, "\u2715"));
    }));
  })));
};

export default CurrentRefinements;