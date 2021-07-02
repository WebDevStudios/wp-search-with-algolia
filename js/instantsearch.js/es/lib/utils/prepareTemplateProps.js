function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import uniq from './uniq';

function prepareTemplates( // can not use = {} here, since the template could have different constraints
defaultTemplates) {
  var templates = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var allKeys = uniq([].concat(_toConsumableArray(Object.keys(defaultTemplates || {})), _toConsumableArray(Object.keys(templates))));
  return allKeys.reduce(function (config, key) {
    var defaultTemplate = defaultTemplates ? defaultTemplates[key] : undefined;
    var customTemplate = templates[key];
    var isCustomTemplate = customTemplate !== undefined && customTemplate !== defaultTemplate;
    config.templates[key] = isCustomTemplate ? customTemplate // typescript doesn't recognize that this condition asserts customTemplate is defined
    : defaultTemplate;
    config.useCustomCompileOptions[key] = isCustomTemplate;
    return config;
  }, {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    templates: {},
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    useCustomCompileOptions: {}
  });
}
/**
 * Prepares an object to be passed to the Template widget
 */


function prepareTemplateProps(_ref) {
  var defaultTemplates = _ref.defaultTemplates,
      templates = _ref.templates,
      templatesConfig = _ref.templatesConfig;
  var preparedTemplates = prepareTemplates(defaultTemplates, templates);
  return _objectSpread({
    templatesConfig: templatesConfig
  }, preparedTemplates);
}

export default prepareTemplateProps;