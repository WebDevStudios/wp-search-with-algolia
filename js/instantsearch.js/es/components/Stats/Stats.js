function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'preact-compat';
import PropTypes from 'prop-types';
import Template from '../Template/Template';

var Stats = function Stats(_ref) {
  var nbHits = _ref.nbHits,
      hitsPerPage = _ref.hitsPerPage,
      nbPages = _ref.nbPages,
      page = _ref.page,
      processingTimeMS = _ref.processingTimeMS,
      query = _ref.query,
      templateProps = _ref.templateProps,
      cssClasses = _ref.cssClasses;
  return React.createElement("div", {
    className: cssClasses.root
  }, React.createElement(Template, _extends({}, templateProps, {
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

export default Stats;