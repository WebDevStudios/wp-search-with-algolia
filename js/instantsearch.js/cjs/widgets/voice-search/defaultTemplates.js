"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var getButtonInnerElement = function getButtonInnerElement(status, errorCode, isListening) {
  if (status === 'error' && errorCode === 'not-allowed') {
    return "<line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"></line>\n            <path d=\"M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6\"></path>\n            <path d=\"M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23\"></path>\n            <line x1=\"12\" y1=\"19\" x2=\"12\" y2=\"23\"></line>\n            <line x1=\"8\" y1=\"23\" x2=\"16\" y2=\"23\"></line>";
  }

  return "<path\n            d=\"M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z\"\n            fill=\"".concat(isListening ? 'currentColor' : 'none', "\">\n          </path>\n          <path d=\"M19 10v2a7 7 0 0 1-14 0v-2\"></path>\n          <line x1=\"12\" y1=\"19\" x2=\"12\" y2=\"23\"></line>\n          <line x1=\"8\" y1=\"23\" x2=\"16\" y2=\"23\"></line>");
};

var defaultTemplates = {
  buttonText: function buttonText(_ref) {
    var status = _ref.status,
        errorCode = _ref.errorCode,
        isListening = _ref.isListening;
    return "<svg\n       xmlns=\"http://www.w3.org/2000/svg\"\n       width=\"16\"\n       height=\"16\"\n       viewBox=\"0 0 24 24\"\n       fill=\"none\"\n       stroke=\"currentColor\"\n       stroke-width=\"2\"\n       stroke-linecap=\"round\"\n       stroke-linejoin=\"round\"\n     >\n       ".concat(getButtonInnerElement(status, errorCode, isListening), "\n     </svg>");
  },
  status: "<p>{{transcript}}</p>"
};
var _default = defaultTemplates;
exports.default = _default;