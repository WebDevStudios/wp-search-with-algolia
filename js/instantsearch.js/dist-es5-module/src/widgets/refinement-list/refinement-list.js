'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utils = require('../../lib/utils.js');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _filter = require('lodash/filter');

var _filter2 = _interopRequireDefault(_filter);

var _autoHideContainer = require('../../decorators/autoHideContainer.js');

var _autoHideContainer2 = _interopRequireDefault(_autoHideContainer);

var _headerFooter = require('../../decorators/headerFooter.js');

var _headerFooter2 = _interopRequireDefault(_headerFooter);

var _getShowMoreConfig = require('../../lib/show-more/getShowMoreConfig.js');

var _getShowMoreConfig2 = _interopRequireDefault(_getShowMoreConfig);

var _defaultTemplates = require('./defaultTemplates.js');

var _defaultTemplates2 = _interopRequireDefault(_defaultTemplates);

var _RefinementList = require('../../components/RefinementList/RefinementList.js');

var _RefinementList2 = _interopRequireDefault(_RefinementList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var bem = (0, _utils.bemHelper)('ais-refinement-list');
/**
 * Instantiate a list of refinements based on a facet
 * @function refinementList
 * @param  {string|DOMElement} options.container CSS Selector or DOMElement to insert the widget
 * @param  {string} options.attributeName Name of the attribute for faceting
 * @param  {string} [options.operator='or'] How to apply refinements. Possible values: `or`, `and` [*]
 * @param  {string[]|Function} [options.sortBy=['count:desc', 'name:asc']] How to sort refinements. Possible values: `count:asc|count:desc|name:asc|name:desc|isRefined`.
 *   You can also use a sort function that behaves like the standard Javascript [compareFunction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Syntax). [*]
 * @param  {string} [options.limit=10] How much facet values to get. When the show more feature is activated this is the minimum number of facets requested (the show more button is not in active state). [*]
 * @param  {object|boolean} [options.searchForFacetValues=false] Add a search input to let the user search for more facet values
 * @param  {string} [options.searchForFacetValues.placeholder] Value of the search field placeholder
 * @param  {boolean} [options.searchForFacetValues.isAlwaysActive=false] When `false` the search field will become disabled if
 * there are less items to display than the `options.limit`, otherwise the search field is always usable.
 * @param  {string} [options.searchForFacetValues.templates] Templates to use for search for facet values
 * @param  {string} [options.searchForFacetValues.templates.noResults] Templates to use for search for facet values
 * @param  {object|boolean} [options.showMore=false] Limit the number of results and display a showMore button
 * @param  {object} [options.showMore.templates] Templates to use for showMore
 * @param  {object} [options.showMore.templates.active] Template used when showMore was clicked
 * @param  {object} [options.showMore.templates.inactive] Template used when showMore not clicked
 * @param  {object} [options.showMore.limit] Max number of facets values to display when showMore is clicked
 * @param  {Object} [options.templates] Templates to use for the widget
 * @param  {string|Function} [options.templates.header] Header template, provided with `refinedFacetsCount` data property
 * @param  {string|Function} [options.templates.item] Item template, provided with `name`, `count`, `isRefined`, `url` data properties
 * @param  {string|Function} [options.templates.footer] Footer template
 * @param  {Function} [options.transformData.item] Function to change the object passed to the `item` template
 * @param  {boolean} [options.autoHideContainer=true] Hide the container when no items in the refinement list
 * @param  {Object} [options.cssClasses] CSS classes to add to the wrapping elements
 * @param  {string|string[]} [options.cssClasses.root] CSS class to add to the root element
 * @param  {string|string[]} [options.cssClasses.header] CSS class to add to the header element
 * @param  {string|string[]} [options.cssClasses.body] CSS class to add to the body element
 * @param  {string|string[]} [options.cssClasses.footer] CSS class to add to the footer element
 * @param  {string|string[]} [options.cssClasses.list] CSS class to add to the list element
 * @param  {string|string[]} [options.cssClasses.item] CSS class to add to each item element
 * @param  {string|string[]} [options.cssClasses.active] CSS class to add to each active element
 * @param  {string|string[]} [options.cssClasses.label] CSS class to add to each label element (when using the default template)
 * @param  {string|string[]} [options.cssClasses.checkbox] CSS class to add to each checkbox element (when using the default template)
 * @param  {string|string[]} [options.cssClasses.count] CSS class to add to each count element (when using the default template)
 * @param  {object|boolean} [options.collapsible=false] Hide the widget body and footer when clicking on header
 * @param  {boolean} [options.collapsible.collapsed] Initial collapsed state of a collapsible widget
 * @return {Object}
 */
var usage = 'Usage:\nrefinementList({\n  container,\n  attributeName,\n  [ operator=\'or\' ],\n  [ sortBy=[\'count:desc\', \'name:asc\'] ],\n  [ limit=10 ],\n  [ cssClasses.{root, header, body, footer, list, item, active, label, checkbox, count}],\n  [ templates.{header,item,footer} ],\n  [ transformData.{item} ],\n  [ autoHideContainer=true ],\n  [ collapsible=false ],\n  [ showMore.{templates: {active, inactive}, limit} ],\n  [ collapsible=false ],\n  [ searchForFacetValues.{placeholder, templates: {noResults}, isAlwaysActive}],\n})';
function refinementList(_ref) {
  var container = _ref.container,
      attributeName = _ref.attributeName,
      _ref$operator = _ref.operator,
      operator = _ref$operator === undefined ? 'or' : _ref$operator,
      _ref$sortBy = _ref.sortBy,
      sortBy = _ref$sortBy === undefined ? ['count:desc', 'name:asc'] : _ref$sortBy,
      _ref$limit = _ref.limit,
      limit = _ref$limit === undefined ? 10 : _ref$limit,
      _ref$cssClasses = _ref.cssClasses,
      userCssClasses = _ref$cssClasses === undefined ? {} : _ref$cssClasses,
      _ref$templates = _ref.templates,
      templates = _ref$templates === undefined ? _defaultTemplates2.default : _ref$templates,
      _ref$collapsible = _ref.collapsible,
      collapsible = _ref$collapsible === undefined ? false : _ref$collapsible,
      transformData = _ref.transformData,
      _ref$autoHideContaine = _ref.autoHideContainer,
      autoHideContainer = _ref$autoHideContaine === undefined ? true : _ref$autoHideContaine,
      _ref$showMore = _ref.showMore,
      showMore = _ref$showMore === undefined ? false : _ref$showMore,
      _ref$searchForFacetVa = _ref.searchForFacetValues,
      searchForFacetValues = _ref$searchForFacetVa === undefined ? false : _ref$searchForFacetVa;

  var showMoreConfig = (0, _getShowMoreConfig2.default)(showMore);
  if (showMoreConfig && showMoreConfig.limit < limit) {
    throw new Error('showMore.limit configuration should be > than the limit in the main configuration'); // eslint-disable-line
  }
  var widgetMaxValuesPerFacet = showMoreConfig && showMoreConfig.limit || limit;

  var RefinementList = _RefinementList2.default;
  if (!container || !attributeName) {
    throw new Error(usage);
  }

  RefinementList = (0, _headerFooter2.default)(RefinementList);
  if (autoHideContainer === true) {
    RefinementList = (0, _autoHideContainer2.default)(RefinementList);
  }

  var containerNode = (0, _utils.getContainerNode)(container);

  if (operator) {
    operator = operator.toLowerCase();
    if (operator !== 'and' && operator !== 'or') {
      throw new Error(usage);
    }
  }

  var showMoreTemplates = showMoreConfig ? (0, _utils.prefixKeys)('show-more-', showMoreConfig.templates) : {};
  var searchForValuesTemplates = searchForFacetValues ? searchForFacetValues.templates : {};
  var allTemplates = _extends({}, templates, showMoreTemplates, searchForValuesTemplates);

  var cssClasses = {
    root: (0, _classnames2.default)(bem(null), userCssClasses.root),
    header: (0, _classnames2.default)(bem('header'), userCssClasses.header),
    body: (0, _classnames2.default)(bem('body'), userCssClasses.body),
    footer: (0, _classnames2.default)(bem('footer'), userCssClasses.footer),
    list: (0, _classnames2.default)(bem('list'), userCssClasses.list),
    item: (0, _classnames2.default)(bem('item'), userCssClasses.item),
    active: (0, _classnames2.default)(bem('item', 'active'), userCssClasses.active),
    label: (0, _classnames2.default)(bem('label'), userCssClasses.label),
    checkbox: (0, _classnames2.default)(bem('checkbox'), userCssClasses.checkbox),
    count: (0, _classnames2.default)(bem('count'), userCssClasses.count)
  };

  /* eslint-disable max-params */
  var _render = function _render(facetValues, state, createURL, helperSpecializedSearchFacetValues, templateProps, toggleRefinement, isFromSearch) {
    // Bind createURL to this specific attribute
    function _createURL(facetValue) {
      return createURL(state.toggleRefinement(attributeName, facetValue));
    }

    // Pass count of currently selected items to the header template
    var refinedFacetsCount = (0, _filter2.default)(facetValues, { isRefined: true }).length;
    var headerFooterData = {
      header: { refinedFacetsCount: refinedFacetsCount }
    };

    // Do not mistake searchForFacetValues and searchFacetValues which is the actual search
    // function
    var searchFacetValues = helperSpecializedSearchFacetValues && helperSpecializedSearchFacetValues(state, createURL, helperSpecializedSearchFacetValues, templateProps, toggleRefinement);

    _reactDom2.default.render(_react2.default.createElement(RefinementList, {
      collapsible: collapsible,
      createURL: _createURL,
      cssClasses: cssClasses,
      facetValues: facetValues,
      headerFooterData: headerFooterData,
      limitMax: widgetMaxValuesPerFacet,
      limitMin: limit,
      shouldAutoHideContainer: !isFromSearch && facetValues.length === 0,
      showMore: showMoreConfig !== null,
      templateProps: templateProps,
      toggleRefinement: toggleRefinement,
      searchFacetValues: searchFacetValues,
      searchPlaceholder: searchForFacetValues.placeholder || 'Search for other...',
      searchIsAlwaysActive: searchForFacetValues.isAlwaysActive || false,
      isFromSearch: isFromSearch
    }), containerNode);
  };

  var lastResultsFromMainSearch = null;

  // Do not mistake searchForFacetValues and searchFacetValues which is the actual search
  // function
  var searchFacetValues = function searchFacetValues(helper) {
    return function (state, createURL, helperSpecializedSearchFacetValues, templateProps, toggleRefinement) {
      return function (query) {
        if (query === '' && lastResultsFromMainSearch) {
          // render with previous data from the helper.
          _render(lastResultsFromMainSearch, state, createURL, helperSpecializedSearchFacetValues, templateProps, toggleRefinement, false);
        } else {
          helper.searchForFacetValues(attributeName, query).then(function (results) {
            var facetValues = results.facetHits.map(function (h) {
              h.name = h.value;
              return h;
            });
            _render(facetValues, state, createURL, helperSpecializedSearchFacetValues, templateProps, toggleRefinement, true);
          });
        }
      };
    };
  };

  return {
    getConfiguration: function getConfiguration(configuration) {
      var widgetConfiguration = _defineProperty({}, operator === 'and' ? 'facets' : 'disjunctiveFacets', [attributeName]);

      var currentMaxValuesPerFacet = configuration.maxValuesPerFacet || 0;
      widgetConfiguration.maxValuesPerFacet = Math.max(currentMaxValuesPerFacet, widgetMaxValuesPerFacet);

      return widgetConfiguration;
    },
    init: function init(_ref2) {
      var templatesConfig = _ref2.templatesConfig,
          helper = _ref2.helper;

      this._templateProps = (0, _utils.prepareTemplateProps)({
        transformData: transformData,
        defaultTemplates: _defaultTemplates2.default,
        templatesConfig: templatesConfig,
        templates: allTemplates
      });

      this.toggleRefinement = function (facetValue) {
        return helper.toggleRefinement(attributeName, facetValue).search();
      };

      this.searchFacetValues = searchForFacetValues ? searchFacetValues(helper) : null;
    },
    render: function render(_ref3) {
      var results = _ref3.results,
          state = _ref3.state,
          createURL = _ref3.createURL;

      var facetValues = results.getFacetValues(attributeName, { sortBy: sortBy }).map(function (h) {
        h.highlighted = h.name;
        return h;
      });

      lastResultsFromMainSearch = facetValues;

      _render(facetValues, state, createURL, this.searchFacetValues, this._templateProps, this.toggleRefinement, false);
    }
  };
}

exports.default = refinementList;