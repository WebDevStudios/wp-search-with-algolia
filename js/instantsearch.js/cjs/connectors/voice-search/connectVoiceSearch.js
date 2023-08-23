"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = require("../../lib/utils");
var _voiceSearchHelper2 = _interopRequireDefault(require("../../lib/voiceSearchHelper"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'voice-search',
  connector: true
});
var connectVoiceSearch = function connectVoiceSearch(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.noop;
  (0, _utils.checkRendering)(renderFn, withUsage());
  return function (widgetParams) {
    var _widgetParams$searchA = widgetParams.searchAsYouSpeak,
      searchAsYouSpeak = _widgetParams$searchA === void 0 ? false : _widgetParams$searchA,
      language = widgetParams.language,
      additionalQueryParameters = widgetParams.additionalQueryParameters,
      _widgetParams$createV = widgetParams.createVoiceSearchHelper,
      createVoiceSearchHelper = _widgetParams$createV === void 0 ? _voiceSearchHelper2.default : _widgetParams$createV;
    return {
      $$type: 'ais.voiceSearch',
      init: function init(initOptions) {
        var instantSearchInstance = initOptions.instantSearchInstance;
        renderFn(_objectSpread(_objectSpread({}, this.getWidgetRenderState(initOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), true);
      },
      render: function render(renderOptions) {
        var instantSearchInstance = renderOptions.instantSearchInstance;
        renderFn(_objectSpread(_objectSpread({}, this.getWidgetRenderState(renderOptions)), {}, {
          instantSearchInstance: instantSearchInstance
        }), false);
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread(_objectSpread({}, renderState), {}, {
          voiceSearch: this.getWidgetRenderState(renderOptions)
        });
      },
      getWidgetRenderState: function getWidgetRenderState(renderOptions) {
        var _this = this;
        var helper = renderOptions.helper,
          instantSearchInstance = renderOptions.instantSearchInstance;
        if (!this._refine) {
          this._refine = function (query) {
            if (query !== helper.state.query) {
              var queryLanguages = language ? [language.split('-')[0]] : undefined;
              helper.setQueryParameter('queryLanguages', queryLanguages);
              if (typeof additionalQueryParameters === 'function') {
                helper.setState(helper.state.setQueryParameters(_objectSpread({
                  ignorePlurals: true,
                  removeStopWords: true,
                  // @ts-ignore (optionalWords only allows array in v3, while string is also valid)
                  optionalWords: query
                }, additionalQueryParameters({
                  query: query
                }))));
              }
              helper.setQuery(query).search();
            }
          };
        }
        if (!this._voiceSearchHelper) {
          this._voiceSearchHelper = createVoiceSearchHelper({
            searchAsYouSpeak: searchAsYouSpeak,
            language: language,
            onQueryChange: function onQueryChange(query) {
              return _this._refine(query);
            },
            onStateChange: function onStateChange() {
              renderFn(_objectSpread(_objectSpread({}, _this.getWidgetRenderState(renderOptions)), {}, {
                instantSearchInstance: instantSearchInstance
              }), false);
            }
          });
        }
        var _voiceSearchHelper = this._voiceSearchHelper,
          isBrowserSupported = _voiceSearchHelper.isBrowserSupported,
          isListening = _voiceSearchHelper.isListening,
          startListening = _voiceSearchHelper.startListening,
          stopListening = _voiceSearchHelper.stopListening,
          getState = _voiceSearchHelper.getState;
        return {
          isBrowserSupported: isBrowserSupported(),
          isListening: isListening(),
          toggleListening: function toggleListening() {
            if (!isBrowserSupported()) {
              return;
            }
            if (isListening()) {
              stopListening();
            } else {
              startListening();
            }
          },
          voiceListeningState: getState(),
          widgetParams: widgetParams
        };
      },
      dispose: function dispose(_ref) {
        var state = _ref.state;
        this._voiceSearchHelper.dispose();
        unmountFn();
        var newState = state;
        if (typeof additionalQueryParameters === 'function') {
          var additional = additionalQueryParameters({
            query: ''
          });
          var toReset = additional ? Object.keys(additional).reduce(function (acc, current) {
            // @ts-ignore search parameters is typed as readonly in v4
            acc[current] = undefined;
            return acc;
          }, {}) : {};
          newState = state.setQueryParameters(_objectSpread({
            // @ts-ignore (queryLanguages is not added to algoliasearch v3)
            queryLanguages: undefined,
            ignorePlurals: undefined,
            removeStopWords: undefined,
            optionalWords: undefined
          }, toReset));
        }
        return newState.setQueryParameter('query', undefined);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref2) {
        var searchParameters = _ref2.searchParameters;
        var query = searchParameters.query || '';
        if (!query) {
          return uiState;
        }
        return _objectSpread(_objectSpread({}, uiState), {}, {
          query: query
        });
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref3) {
        var uiState = _ref3.uiState;
        return searchParameters.setQueryParameter('query', uiState.query || '');
      }
    };
  };
};
var _default = connectVoiceSearch;
exports.default = _default;