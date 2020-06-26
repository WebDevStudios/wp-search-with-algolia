'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utils = require('../../lib/utils.js');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _InfiniteHits = require('../../components/InfiniteHits.js');

var _InfiniteHits2 = _interopRequireDefault(_InfiniteHits);

var _defaultTemplates = require('./defaultTemplates.js');

var _defaultTemplates2 = _interopRequireDefault(_defaultTemplates);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var bem = (0, _utils.bemHelper)('ais-infinite-hits');

/**
 * Display the list of results (hits) from the current search
 * @function infiniteHits
 * @param  {string|DOMElement} options.container CSS Selector or DOMElement to insert the widget
 * @param  {number} [options.hitsPerPage=20] The number of hits to display per page [*]
 * @param  {Object} [options.templates] Templates to use for the widget
 * @param  {string|Function} [options.templates.empty=""] Template to use when there are no results.
 * @param  {string|Function} [options.templates.item=""] Template to use for each result. This template will receive an object containing a single record.
 * @param  {string} [options.showMoreLabel="Show more results"] label used on the show more button
 * @param  {Object} [options.transformData] Method to change the object passed to the templates
 * @param  {Function} [options.transformData.empty] Method used to change the object passed to the `empty` template
 * @param  {Function} [options.transformData.item] Method used to change the object passed to the `item` template
 * @param  {Object} [options.cssClasses] CSS classes to add
 * @param  {string|string[]} [options.cssClasses.root] CSS class to add to the wrapping element
 * @param  {string|string[]} [options.cssClasses.empty] CSS class to add to the wrapping element when no results
 * @param  {string|string[]} [options.cssClasses.item] CSS class to add to each result
 * @return {Object}
 */
var usage = '\nUsage:\ninfiniteHits({\n  container,\n  [ cssClasses.{root,empty,item}={} ],\n  [ templates.{empty,item} | templates.{empty} ],\n  [ showMoreLabel="Show more results" ]\n  [ transformData.{empty,item} | transformData.{empty} ],\n  [ hitsPerPage=20 ]\n})';
function infiniteHits() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      container = _ref.container,
      _ref$cssClasses = _ref.cssClasses,
      userCssClasses = _ref$cssClasses === undefined ? {} : _ref$cssClasses,
      _ref$showMoreLabel = _ref.showMoreLabel,
      showMoreLabel = _ref$showMoreLabel === undefined ? 'Show more results' : _ref$showMoreLabel,
      _ref$templates = _ref.templates,
      templates = _ref$templates === undefined ? _defaultTemplates2.default : _ref$templates,
      transformData = _ref.transformData,
      _ref$hitsPerPage = _ref.hitsPerPage,
      hitsPerPage = _ref$hitsPerPage === undefined ? 20 : _ref$hitsPerPage;

  if (!container) {
    throw new Error('Must provide a container.' + usage);
  }

  var containerNode = (0, _utils.getContainerNode)(container);
  var cssClasses = {
    root: (0, _classnames2.default)(bem(null), userCssClasses.root),
    item: (0, _classnames2.default)(bem('item'), userCssClasses.item),
    empty: (0, _classnames2.default)(bem(null, 'empty'), userCssClasses.empty),
    showmore: (0, _classnames2.default)(bem('showmore'), userCssClasses.showmore)
  };

  var hitsCache = [];

  var getShowMore = function getShowMore(helper) {
    return function () {
      return helper.nextPage().search();
    };
  };

  return {
    getConfiguration: function getConfiguration() {
      return { hitsPerPage: hitsPerPage };
    },
    init: function init(_ref2) {
      var templatesConfig = _ref2.templatesConfig,
          helper = _ref2.helper;

      this._templateProps = (0, _utils.prepareTemplateProps)({
        transformData: transformData,
        defaultTemplates: _defaultTemplates2.default,
        templatesConfig: templatesConfig,
        templates: templates
      });

      this.showMore = getShowMore(helper);
    },
    render: function render(_ref3) {
      var results = _ref3.results,
          state = _ref3.state;

      if (state.page === 0) {
        hitsCache = [];
      }

      hitsCache = [].concat(_toConsumableArray(hitsCache), _toConsumableArray(results.hits));

      var isLastPage = results.nbPages <= results.page + 1;

      _reactDom2.default.render(_react2.default.createElement(_InfiniteHits2.default, {
        cssClasses: cssClasses,
        hits: hitsCache,
        results: results,
        showMore: this.showMore,
        showMoreLabel: showMoreLabel,
        isLastPage: isLastPage,
        templateProps: this._templateProps
      }), containerNode);
    }
  };
}

exports.default = infiniteHits;