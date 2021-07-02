"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* global SpeechRecognition SpeechRecognitionEvent */
var createVoiceSearchHelper = function createVoiceSearchHelper(_ref) {
  var searchAsYouSpeak = _ref.searchAsYouSpeak,
      language = _ref.language,
      onQueryChange = _ref.onQueryChange,
      onStateChange = _ref.onStateChange;
  var SpeechRecognitionAPI = window.webkitSpeechRecognition || window.SpeechRecognition;

  var getDefaultState = function getDefaultState(status) {
    return {
      status: status,
      transcript: '',
      isSpeechFinal: false,
      errorCode: undefined
    };
  };

  var state = getDefaultState('initial');
  var recognition;

  var isBrowserSupported = function isBrowserSupported() {
    return Boolean(SpeechRecognitionAPI);
  };

  var isListening = function isListening() {
    return state.status === 'askingPermission' || state.status === 'waiting' || state.status === 'recognizing';
  };

  var setState = function setState() {
    var newState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    state = _objectSpread(_objectSpread({}, state), newState);
    onStateChange();
  };

  var getState = function getState() {
    return state;
  };

  var resetState = function resetState() {
    var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'initial';
    setState(getDefaultState(status));
  };

  var onStart = function onStart() {
    setState({
      status: 'waiting'
    });
  };

  var onError = function onError(event) {
    setState({
      status: 'error',
      errorCode: event.error
    });
  };

  var onResult = function onResult(event) {
    setState({
      status: 'recognizing',
      transcript: event.results[0] && event.results[0][0] && event.results[0][0].transcript || '',
      isSpeechFinal: event.results[0] && event.results[0].isFinal
    });

    if (searchAsYouSpeak && state.transcript) {
      onQueryChange(state.transcript);
    }
  };

  var onEnd = function onEnd() {
    if (!state.errorCode && state.transcript && !searchAsYouSpeak) {
      onQueryChange(state.transcript);
    }

    if (state.status !== 'error') {
      setState({
        status: 'finished'
      });
    }
  };

  var startListening = function startListening() {
    recognition = new SpeechRecognitionAPI();

    if (!recognition) {
      return;
    }

    resetState('askingPermission');
    recognition.interimResults = true;

    if (language) {
      recognition.lang = language;
    }

    recognition.addEventListener('start', onStart);
    recognition.addEventListener('error', onError);
    recognition.addEventListener('result', onResult);
    recognition.addEventListener('end', onEnd);
    recognition.start();
  };

  var dispose = function dispose() {
    if (!recognition) {
      return;
    }

    recognition.stop();
    recognition.removeEventListener('start', onStart);
    recognition.removeEventListener('error', onError);
    recognition.removeEventListener('result', onResult);
    recognition.removeEventListener('end', onEnd);
    recognition = undefined;
  };

  var stopListening = function stopListening() {
    dispose(); // Because `dispose` removes event listeners, `end` listener is not called.
    // So we're setting the `status` as `finished` here.
    // If we don't do it, it will be still `waiting` or `recognizing`.

    resetState('finished');
  };

  return {
    getState: getState,
    isBrowserSupported: isBrowserSupported,
    isListening: isListening,
    startListening: startListening,
    stopListening: stopListening,
    dispose: dispose
  };
};

var _default = createVoiceSearchHelper;
exports.default = _default;