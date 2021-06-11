"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _preact = require("preact");

var _classnames = _interopRequireDefault(require("classnames"));

var _utils = require("../../lib/utils");

var _suit = require("../../lib/suit");

var _connectVoiceSearch = _interopRequireDefault(require("../../connectors/voice-search/connectVoiceSearch"));

var _VoiceSearch = _interopRequireDefault(require("../../components/VoiceSearch/VoiceSearch"));

var _defaultTemplates = _interopRequireDefault(require("./defaultTemplates"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'voice-search'
});
var suit = (0, _suit.component)('VoiceSearch');

var renderer = function renderer(_ref) {
  var isBrowserSupported = _ref.isBrowserSupported,
      isListening = _ref.isListening,
      toggleListening = _ref.toggleListening,
      voiceListeningState = _ref.voiceListeningState,
      widgetParams = _ref.widgetParams;
  var container = widgetParams.container,
      cssClasses = widgetParams.cssClasses,
      templates = widgetParams.templates;
  (0, _preact.render)((0, _preact.h)(_VoiceSearch.default, {
    cssClasses: cssClasses,
    templates: templates,
    isBrowserSupported: isBrowserSupported,
    isListening: isListening,
    toggleListening: toggleListening,
    voiceListeningState: voiceListeningState
  }), container);
};

var voiceSearch = function voiceSearch() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      container = _ref2.container,
      _ref2$cssClasses = _ref2.cssClasses,
      userCssClasses = _ref2$cssClasses === void 0 ? {} : _ref2$cssClasses,
      templates = _ref2.templates,
      _ref2$searchAsYouSpea = _ref2.searchAsYouSpeak,
      searchAsYouSpeak = _ref2$searchAsYouSpea === void 0 ? false : _ref2$searchAsYouSpea,
      language = _ref2.language,
      additionalQueryParameters = _ref2.additionalQueryParameters,
      createVoiceSearchHelper = _ref2.createVoiceSearchHelper;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  var containerNode = (0, _utils.getContainerNode)(container);
  var cssClasses = {
    root: (0, _classnames.default)(suit(), userCssClasses.root),
    button: (0, _classnames.default)(suit({
      descendantName: 'button'
    }), userCssClasses.button),
    status: (0, _classnames.default)(suit({
      descendantName: 'status'
    }), userCssClasses.status)
  };
  var makeWidget = (0, _connectVoiceSearch.default)(renderer, function () {
    return (0, _preact.render)(null, containerNode);
  });
  return makeWidget({
    container: containerNode,
    cssClasses: cssClasses,
    templates: _objectSpread({}, _defaultTemplates.default, {}, templates),
    searchAsYouSpeak: searchAsYouSpeak,
    language: language,
    additionalQueryParameters: additionalQueryParameters,
    createVoiceSearchHelper: createVoiceSearchHelper
  });
};

var _default = voiceSearch;
exports.default = _default;