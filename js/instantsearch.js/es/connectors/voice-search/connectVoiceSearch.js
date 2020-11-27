function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { checkRendering, createDocumentationMessageGenerator, noop } from '../../lib/utils';
import createVoiceSearchHelper from '../../lib/voiceSearchHelper';
var withUsage = createDocumentationMessageGenerator({
  name: 'voice-search',
  connector: true
});

var connectVoiceSearch = function connectVoiceSearch(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
  checkRendering(renderFn, withUsage());
  return function (widgetParams) {
    var _render = function render(_ref) {
      var isFirstRendering = _ref.isFirstRendering,
          instantSearchInstance = _ref.instantSearchInstance,
          _ref$voiceSearchHelpe = _ref.voiceSearchHelper,
          isBrowserSupported = _ref$voiceSearchHelpe.isBrowserSupported,
          isListening = _ref$voiceSearchHelpe.isListening,
          toggleListening = _ref$voiceSearchHelpe.toggleListening,
          getState = _ref$voiceSearchHelpe.getState;
      renderFn({
        isBrowserSupported: isBrowserSupported(),
        isListening: isListening(),
        toggleListening: toggleListening,
        voiceListeningState: getState(),
        widgetParams: widgetParams,
        instantSearchInstance: instantSearchInstance
      }, isFirstRendering);
    };

    var _widgetParams$searchA = widgetParams.searchAsYouSpeak,
        searchAsYouSpeak = _widgetParams$searchA === void 0 ? false : _widgetParams$searchA;
    return {
      init: function init(_ref2) {
        var _this = this;

        var helper = _ref2.helper,
            instantSearchInstance = _ref2.instantSearchInstance;

        this._refine = function () {
          var previousQuery;

          var setQueryAndSearch = function setQueryAndSearch(query) {
            if (query !== helper.state.query) {
              previousQuery = helper.state.query;
              helper.setQuery(query);
            }

            if (typeof previousQuery !== 'undefined' && previousQuery !== query) {
              helper.search();
            }
          };

          return setQueryAndSearch;
        }();

        this._voiceSearchHelper = createVoiceSearchHelper({
          searchAsYouSpeak: searchAsYouSpeak,
          onQueryChange: function onQueryChange(query) {
            return _this._refine(query);
          },
          onStateChange: function onStateChange() {
            _render({
              isFirstRendering: false,
              instantSearchInstance: instantSearchInstance,
              voiceSearchHelper: _this._voiceSearchHelper
            });
          }
        });

        _render({
          isFirstRendering: true,
          instantSearchInstance: instantSearchInstance,
          voiceSearchHelper: this._voiceSearchHelper
        });
      },
      render: function render(_ref3) {
        var instantSearchInstance = _ref3.instantSearchInstance;

        _render({
          isFirstRendering: false,
          instantSearchInstance: instantSearchInstance,
          voiceSearchHelper: this._voiceSearchHelper
        });
      },
      dispose: function dispose(_ref4) {
        var state = _ref4.state;

        this._voiceSearchHelper.dispose();

        unmountFn();
        return state.setQuery('');
      },
      getWidgetState: function getWidgetState(uiState, _ref5) {
        var searchParameters = _ref5.searchParameters;
        var query = searchParameters.query;

        if (query === '' || uiState && uiState.query === query) {
          return uiState;
        }

        return _objectSpread({}, uiState, {
          query: query
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref6) {
        var uiState = _ref6.uiState;
        return searchParameters.setQuery(uiState.query || '');
      }
    };
  };
};

export default connectVoiceSearch;