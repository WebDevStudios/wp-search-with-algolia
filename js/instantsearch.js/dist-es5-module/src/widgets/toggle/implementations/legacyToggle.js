'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = currentToggle;

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _defaultTemplates = require('../defaultTemplates.js');

var _defaultTemplates2 = _interopRequireDefault(_defaultTemplates);

var _utils = require('../../../lib/utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function currentToggle() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      attributeName = _ref.attributeName,
      label = _ref.label,
      userValues = _ref.userValues,
      templates = _ref.templates,
      collapsible = _ref.collapsible,
      transformData = _ref.transformData,
      hasAnOffValue = _ref.hasAnOffValue,
      containerNode = _ref.containerNode,
      RefinementList = _ref.RefinementList,
      cssClasses = _ref.cssClasses;

  return {
    getConfiguration: function getConfiguration() {
      return {
        facets: [attributeName]
      };
    },
    toggleRefinement: function toggleRefinement(helper, facetValue, isRefined) {
      var on = userValues.on;
      var off = userValues.off;

      // Checking
      if (!isRefined) {
        if (hasAnOffValue) {
          helper.removeFacetRefinement(attributeName, off);
        }
        helper.addFacetRefinement(attributeName, on);
      } else {
        // Unchecking
        helper.removeFacetRefinement(attributeName, on);
        if (hasAnOffValue) {
          helper.addFacetRefinement(attributeName, off);
        }
      }

      helper.search();
    },
    init: function init(_ref2) {
      var state = _ref2.state,
          helper = _ref2.helper,
          templatesConfig = _ref2.templatesConfig;

      this._templateProps = (0, _utils.prepareTemplateProps)({
        transformData: transformData,
        defaultTemplates: _defaultTemplates2.default,
        templatesConfig: templatesConfig,
        templates: templates
      });
      this.toggleRefinement = this.toggleRefinement.bind(this, helper);

      // no need to refine anything at init if no custom off values
      if (!hasAnOffValue) {
        return;
      }
      // Add filtering on the 'off' value if set
      var isRefined = state.isFacetRefined(attributeName, userValues.on);
      if (!isRefined) {
        helper.addFacetRefinement(attributeName, userValues.off);
      }
    },
    render: function render(_ref3) {
      var helper = _ref3.helper,
          results = _ref3.results,
          state = _ref3.state,
          createURL = _ref3.createURL;

      var isRefined = helper.state.isFacetRefined(attributeName, userValues.on);
      var currentRefinement = isRefined ? userValues.on : userValues.off;
      var count = void 0;
      if (typeof currentRefinement === 'number') {
        count = results.getFacetStats(attributeName).sum;
      } else {
        var facetData = (0, _find2.default)(results.getFacetValues(attributeName), { name: isRefined.toString() });
        count = facetData !== undefined ? facetData.count : null;
      }

      var facetValue = {
        name: label,
        isRefined: isRefined,
        count: count
      };

      // Bind createURL to this specific attribute
      function _createURL() {
        return createURL(state.toggleRefinement(attributeName, isRefined));
      }

      _reactDom2.default.render(_react2.default.createElement(RefinementList, {
        collapsible: collapsible,
        createURL: _createURL,
        cssClasses: cssClasses,
        facetValues: [facetValue],
        shouldAutoHideContainer: results.nbHits === 0,
        templateProps: this._templateProps,
        toggleRefinement: this.toggleRefinement
      }), containerNode);
    }
  };
}