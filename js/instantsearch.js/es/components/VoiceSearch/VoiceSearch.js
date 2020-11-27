import React from 'preact-compat';
import Template from '../Template/Template';

var VoiceSearch = function VoiceSearch(_ref) {
  var cssClasses = _ref.cssClasses,
      isBrowserSupported = _ref.isBrowserSupported,
      isListening = _ref.isListening,
      toggleListening = _ref.toggleListening,
      voiceListeningState = _ref.voiceListeningState,
      templates = _ref.templates;

  var handleClick = function handleClick(event) {
    event.currentTarget.blur();
    toggleListening();
  };

  var status = voiceListeningState.status,
      transcript = voiceListeningState.transcript,
      isSpeechFinal = voiceListeningState.isSpeechFinal,
      errorCode = voiceListeningState.errorCode;
  return React.createElement("div", {
    className: cssClasses.root
  }, React.createElement(Template, {
    templateKey: "buttonText",
    rootTagName: "button",
    rootProps: {
      className: cssClasses.button,
      type: 'button',
      title: "Search by voice".concat(isBrowserSupported ? '' : ' (not supported on this browser)'),
      onClick: handleClick,
      disabled: !isBrowserSupported
    },
    data: {
      status: status,
      errorCode: errorCode,
      isListening: isListening,
      transcript: transcript,
      isSpeechFinal: isSpeechFinal,
      isBrowserSupported: isBrowserSupported
    },
    templates: templates
  }), React.createElement(Template, {
    templateKey: "status",
    rootProps: {
      className: cssClasses.status
    },
    data: {
      status: status,
      errorCode: errorCode,
      isListening: isListening,
      transcript: transcript,
      isSpeechFinal: isSpeechFinal,
      isBrowserSupported: isBrowserSupported
    },
    templates: templates
  }));
};

export default VoiceSearch;