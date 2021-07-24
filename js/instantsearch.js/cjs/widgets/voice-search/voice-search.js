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
  var containerNode = _ref.containerNode,
      cssClasses = _ref.cssClasses,
      templates = _ref.templates;
  return function (_ref2) {
    var isBrowserSupported = _ref2.isBrowserSupported,
        isListening = _ref2.isListening,
        toggleListening = _ref2.toggleListening,
        voiceListeningState = _ref2.voiceListeningState;
    (0, _preact.render)((0, _preact.h)(_VoiceSearch.default, {
      cssClasses: cssClasses,
      templates: templates,
      isBrowserSupported: isBrowserSupported,
      isListening: isListening,
      toggleListening: toggleListening,
      voiceListeningState: voiceListeningState
    }), containerNode);
  };
};

var voiceSearch = function voiceSearch(widgetParams) {
  var _ref3 = widgetParams || {},
      container = _ref3.container,
      _ref3$cssClasses = _ref3.cssClasses,
      userCssClasses = _ref3$cssClasses === void 0 ? {} : _ref3$cssClasses,
      _ref3$templates = _ref3.templates,
      userTemplates = _ref3$templates === void 0 ? {} : _ref3$templates,
      _ref3$searchAsYouSpea = _ref3.searchAsYouSpeak,
      searchAsYouSpeak = _ref3$searchAsYouSpea === void 0 ? false : _ref3$searchAsYouSpea,
      language = _ref3.language,
      additionalQueryParameters = _ref3.additionalQueryParameters,
      createVoiceSearchHelper = _ref3.createVoiceSearchHelper;

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

  var templates = _objectSpread(_objectSpread({}, _defaultTemplates.default), userTemplates);

  var specializedRenderer = renderer({
    containerNode: containerNode,
    cssClasses: cssClasses,
    templates: templates
  });
  var makeWidget = (0, _connectVoiceSearch.default)(specializedRenderer, function () {
    return (0, _preact.render)(null, containerNode);
  });
  return _objectSpread(_objectSpread({}, makeWidget({
    container: containerNode,
    cssClasses: cssClasses,
    templates: templates,
    searchAsYouSpeak: searchAsYouSpeak,
    language: language,
    additionalQueryParameters: additionalQueryParameters,
    createVoiceSearchHelper: createVoiceSearchHelper
  })), {}, {
    $$widgetType: 'ais.voiceSearch'
  });
};

var _default = voiceSearch;
exports.default = _default;