function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { render, unmountComponentAtNode } from 'preact-compat';
import cx from 'classnames';
import { getContainerNode, createDocumentationMessageGenerator } from '../../lib/utils';
import { component } from '../../lib/suit';
import connectVoiceSearch from '../../connectors/voice-search/connectVoiceSearch';
import VoiceSearch from '../../components/VoiceSearch/VoiceSearch';
import defaultTemplates from './defaultTemplates';
var withUsage = createDocumentationMessageGenerator({
  name: 'voice-search'
});
var suit = component('VoiceSearch');

var renderer = function renderer(_ref) {
  var isBrowserSupported = _ref.isBrowserSupported,
      isListening = _ref.isListening,
      toggleListening = _ref.toggleListening,
      voiceListeningState = _ref.voiceListeningState,
      widgetParams = _ref.widgetParams;
  var container = widgetParams.container,
      cssClasses = widgetParams.cssClasses,
      templates = widgetParams.templates;
  render(React.createElement(VoiceSearch, {
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
      searchAsYouSpeak = _ref2.searchAsYouSpeak;

  if (!container) {
    throw new Error(withUsage('The `container` option is required.'));
  }

  var containerNode = getContainerNode(container);
  var cssClasses = {
    root: cx(suit(), userCssClasses.root),
    button: cx(suit({
      descendantName: 'button'
    }), userCssClasses.button),
    status: cx(suit({
      descendantName: 'status'
    }), userCssClasses.status)
  };
  var makeWidget = connectVoiceSearch(renderer, function () {
    return unmountComponentAtNode(containerNode);
  });
  return makeWidget({
    container: containerNode,
    cssClasses: cssClasses,
    templates: _objectSpread({}, defaultTemplates, {}, templates),
    searchAsYouSpeak: searchAsYouSpeak
  });
};

export default voiceSearch;