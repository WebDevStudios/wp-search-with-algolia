"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connectAutocomplete;

var _escapeHighlight = _interopRequireWildcard(require("../../lib/escape-highlight"));

var _utils = require("../../lib/utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'autocomplete',
  connector: true
});
/**
 * @typedef {Object} Index
 * @property {string} index Name of the index.
 * @property {string} label Label of the index (for display purpose).
 * @property {Object[]} hits The hits resolved from the index matching the query.
 * @property {Object} results The full results object from Algolia API.
 */

/**
 * @typedef {Object} AutocompleteRenderingOptions
 * @property {Index[]} indices The indices you provided with their hits and results and the main index as first position.
 * @property {function(string)} refine Search into the indices with the query provided.
 * @property {string} currentRefinement The actual value of the query.
 * @property {Object} widgetParams All original widget options forwarded to the `renderFn`.
 */

/**
 * @typedef {Object} CustomAutocompleteWidgetOptions
 * @property {{value: string, label: string}[]} [indices = []] Name of the others indices to search into.
 * @property {boolean} [escapeHTML = true] If true, escape HTML tags from `hits[i]._highlightResult`.
 */

/**
 * **Autocomplete** connector provides the logic to build a widget that will give the user the ability to search into multiple indices.
 *
 * This connector provides a `refine()` function to search for a query and a `currentRefinement` as the current query used to search.
 * @type {Connector}
 * @param {function(AutocompleteRenderingOptions, boolean)} renderFn Rendering function for the custom **Autocomplete** widget.
 * @param {function} unmountFn Unmount function called when the widget is disposed.
 * @return {function(CustomAutocompleteWidgetOptions)} Re-usable widget factory for a custom **Autocomplete** widget.
 */

function connectAutocomplete(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.noop;
  (0, _utils.checkRendering)(renderFn, withUsage());
  return function () {
    var widgetParams = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _widgetParams$escapeH = widgetParams.escapeHTML,
        escapeHTML = _widgetParams$escapeH === void 0 ? true : _widgetParams$escapeH,
        _widgetParams$indices = widgetParams.indices,
        indices = _widgetParams$indices === void 0 ? [] : _widgetParams$indices; // user passed a wrong `indices` option type

    if (!Array.isArray(indices)) {
      throw new Error(withUsage('The `indices` option expects an array of objects.'));
    }

    return {
      getConfiguration: function getConfiguration() {
        return escapeHTML ? _escapeHighlight.TAG_PLACEHOLDER : undefined;
      },
      init: function init(_ref) {
        var _this = this;

        var instantSearchInstance = _ref.instantSearchInstance,
            helper = _ref.helper;
        this._refine = this.refine(helper);
        this.indices = [{
          helper: helper,
          label: 'primary',
          index: helper.getIndex(),
          results: undefined,
          hits: []
        }]; // add additionnal indices into `this.indices`

        indices.forEach(function (_ref2) {
          var label = _ref2.label,
              value = _ref2.value;
          var derivedHelper = helper.derive(function (searchParameters) {
            return searchParameters.setIndex(value);
          });

          _this.indices.push({
            label: label,
            index: value,
            helper: derivedHelper,
            results: undefined,
            hits: []
          }); // update results then trigger render after a search from any helper


          derivedHelper.on('result', function (results) {
            return _this.saveResults({
              results: results,
              label: label
            });
          });
        });
        this.instantSearchInstance = instantSearchInstance;
        this.renderWithAllIndices({
          isFirstRendering: true
        });
      },
      saveResults: function saveResults(_ref3) {
        var results = _ref3.results,
            label = _ref3.label;
        var derivedIndex = (0, _utils.find)(this.indices, function (i) {
          return i.label === label;
        });

        if (escapeHTML && results && results.hits && results.hits.length > 0) {
          results.hits = (0, _escapeHighlight.default)(results.hits);
        }

        derivedIndex.results = results;
        derivedIndex.hits = results && results.hits && Array.isArray(results.hits) ? results.hits : [];
        this.renderWithAllIndices();
      },
      refine: function refine(helper) {
        return function (query) {
          return helper.setQuery(query).search();
        };
      },
      render: function render(_ref4) {
        var results = _ref4.results;
        this.saveResults({
          results: results,
          label: this.indices[0].label
        });
      },
      renderWithAllIndices: function renderWithAllIndices() {
        var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref5$isFirstRenderin = _ref5.isFirstRendering,
            isFirstRendering = _ref5$isFirstRenderin === void 0 ? false : _ref5$isFirstRenderin;

        var currentRefinement = this.indices[0].helper.state.query;
        renderFn({
          widgetParams: widgetParams,
          currentRefinement: currentRefinement,
          // we do not want to provide the `helper` to the end-user
          indices: this.indices.map(function (_ref6) {
            var index = _ref6.index,
                label = _ref6.label,
                hits = _ref6.hits,
                results = _ref6.results;
            return {
              index: index,
              label: label,
              hits: hits,
              results: results
            };
          }),
          instantSearchInstance: this.instantSearchInstance,
          refine: this._refine
        }, isFirstRendering);
      },
      dispose: function dispose() {
        // detach every derived indices from the main helper instance
        this.indices.slice(1).forEach(function (_ref7) {
          var helper = _ref7.helper;
          return helper.detach();
        });
        unmountFn();
      }
    };
  };
}