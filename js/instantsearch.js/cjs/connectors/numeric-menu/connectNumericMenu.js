"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _utils = require("../../lib/utils");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var withUsage = (0, _utils.createDocumentationMessageGenerator)({
  name: 'numeric-menu',
  connector: true
});
var $$type = 'ais.numericMenu';
var createSendEvent = function createSendEvent(_ref) {
  var instantSearchInstance = _ref.instantSearchInstance;
  return function () {
    if (arguments.length === 1) {
      instantSearchInstance.sendEventToInsights(arguments.length <= 0 ? undefined : arguments[0]);
      return;
    }
  };
};
var connectNumericMenu = function connectNumericMenu(renderFn) {
  var unmountFn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.noop;
  (0, _utils.checkRendering)(renderFn, withUsage());
  return function (widgetParams) {
    var _ref2 = widgetParams || {},
      _ref2$attribute = _ref2.attribute,
      attribute = _ref2$attribute === void 0 ? '' : _ref2$attribute,
      _ref2$items = _ref2.items,
      items = _ref2$items === void 0 ? [] : _ref2$items,
      _ref2$transformItems = _ref2.transformItems,
      transformItems = _ref2$transformItems === void 0 ? function (item) {
        return item;
      } : _ref2$transformItems;
    if (attribute === '') {
      throw new Error(withUsage('The `attribute` option is required.'));
    }
    if (!items || items.length === 0) {
      throw new Error(withUsage('The `items` option expects an array of objects.'));
    }
    var prepareItems = function prepareItems(state) {
      return items.map(function (_ref3) {
        var start = _ref3.start,
          end = _ref3.end,
          label = _ref3.label;
        return {
          label: label,
          value: encodeURI(JSON.stringify({
            start: start,
            end: end
          })),
          isRefined: isRefined(state, attribute, {
            start: start,
            end: end,
            label: label
          })
        };
      });
    };
    var connectorState = {};
    return {
      $$type: $$type,
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
      dispose: function dispose(_ref4) {
        var state = _ref4.state;
        unmountFn();
        return state.removeNumericRefinement(attribute);
      },
      getWidgetUiState: function getWidgetUiState(uiState, _ref5) {
        var searchParameters = _ref5.searchParameters;
        var values = searchParameters.getNumericRefinements(attribute);
        var equal = values['='] && values['='][0];
        if (equal || equal === 0) {
          return _objectSpread(_objectSpread({}, uiState), {}, {
            numericMenu: _objectSpread(_objectSpread({}, uiState.numericMenu), {}, _defineProperty({}, attribute, "".concat(values['='])))
          });
        }
        var min = values['>='] && values['>='][0] || '';
        var max = values['<='] && values['<='][0] || '';
        return removeEmptyRefinementsFromUiState(_objectSpread(_objectSpread({}, uiState), {}, {
          numericMenu: _objectSpread(_objectSpread({}, uiState.numericMenu), {}, _defineProperty({}, attribute, "".concat(min, ":").concat(max)))
        }), attribute);
      },
      getWidgetSearchParameters: function getWidgetSearchParameters(searchParameters, _ref6) {
        var uiState = _ref6.uiState;
        var value = uiState.numericMenu && uiState.numericMenu[attribute];
        var withoutRefinements = searchParameters.setQueryParameters({
          numericRefinements: _objectSpread(_objectSpread({}, searchParameters.numericRefinements), {}, _defineProperty({}, attribute, {}))
        });
        if (!value) {
          return withoutRefinements;
        }
        var isExact = value.indexOf(':') === -1;
        if (isExact) {
          return withoutRefinements.addNumericRefinement(attribute, '=', Number(value));
        }
        var _value$split$map = value.split(':').map(parseFloat),
          _value$split$map2 = _slicedToArray(_value$split$map, 2),
          min = _value$split$map2[0],
          max = _value$split$map2[1];
        var withMinRefinement = (0, _utils.isFiniteNumber)(min) ? withoutRefinements.addNumericRefinement(attribute, '>=', min) : withoutRefinements;
        var withMaxRefinement = (0, _utils.isFiniteNumber)(max) ? withMinRefinement.addNumericRefinement(attribute, '<=', max) : withMinRefinement;
        return withMaxRefinement;
      },
      getRenderState: function getRenderState(renderState, renderOptions) {
        return _objectSpread(_objectSpread({}, renderState), {}, {
          numericMenu: _objectSpread(_objectSpread({}, renderState.numericMenu), {}, _defineProperty({}, attribute, this.getWidgetRenderState(renderOptions)))
        });
      },
      getWidgetRenderState: function getWidgetRenderState(_ref7) {
        var _this = this;
        var results = _ref7.results,
          state = _ref7.state,
          instantSearchInstance = _ref7.instantSearchInstance,
          helper = _ref7.helper,
          createURL = _ref7.createURL;
        if (!connectorState.refine) {
          connectorState.refine = function (facetValue) {
            var refinedState = getRefinedState(helper.state, attribute, facetValue);
            connectorState.sendEvent('click:internal', facetValue);
            helper.setState(refinedState).search();
          };
        }
        if (!connectorState.createURL) {
          connectorState.createURL = function (newState) {
            return function (facetValue) {
              return createURL(function (uiState) {
                return _this.getWidgetUiState(uiState, {
                  searchParameters: getRefinedState(newState, attribute, facetValue),
                  helper: helper
                });
              });
            };
          };
        }
        if (!connectorState.sendEvent) {
          connectorState.sendEvent = createSendEvent({
            instantSearchInstance: instantSearchInstance
          });
        }
        var hasNoResults = results ? results.nbHits === 0 : true;
        var preparedItems = prepareItems(state);
        var allIsSelected = true;
        // @TODO avoid for..of for polyfill reasons
        // eslint-disable-next-line no-restricted-syntax
        var _iterator = _createForOfIteratorHelper(preparedItems),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var item = _step.value;
            if (item.isRefined && decodeURI(item.value) !== '{}') {
              allIsSelected = false;
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        return {
          createURL: connectorState.createURL(state),
          items: transformItems(preparedItems, {
            results: results
          }),
          hasNoResults: hasNoResults,
          canRefine: !(hasNoResults && allIsSelected),
          refine: connectorState.refine,
          sendEvent: connectorState.sendEvent,
          widgetParams: widgetParams
        };
      }
    };
  };
};
function isRefined(state, attribute, option) {
  // @TODO: same as another spot, why is this mixing arrays & elements?
  var currentRefinements = state.getNumericRefinements(attribute);
  if (option.start !== undefined && option.end !== undefined) {
    if (option.start === option.end) {
      return hasNumericRefinement(currentRefinements, '=', option.start);
    } else {
      return hasNumericRefinement(currentRefinements, '>=', option.start) && hasNumericRefinement(currentRefinements, '<=', option.end);
    }
  }
  if (option.start !== undefined) {
    return hasNumericRefinement(currentRefinements, '>=', option.start);
  }
  if (option.end !== undefined) {
    return hasNumericRefinement(currentRefinements, '<=', option.end);
  }
  if (option.start === undefined && option.end === undefined) {
    return Object.keys(currentRefinements).every(function (operator) {
      return (currentRefinements[operator] || []).length === 0;
    });
  }
  return false;
}
function getRefinedState(state, attribute, facetValue) {
  var resolvedState = state;
  var refinedOption = JSON.parse(decodeURI(facetValue));

  // @TODO: why is array / element mixed here & hasRefinements; seems wrong?
  var currentRefinements = resolvedState.getNumericRefinements(attribute);
  if (refinedOption.start === undefined && refinedOption.end === undefined) {
    return resolvedState.removeNumericRefinement(attribute);
  }
  if (!isRefined(resolvedState, attribute, refinedOption)) {
    resolvedState = resolvedState.removeNumericRefinement(attribute);
  }
  if (refinedOption.start !== undefined && refinedOption.end !== undefined) {
    if (refinedOption.start > refinedOption.end) {
      throw new Error('option.start should be > to option.end');
    }
    if (refinedOption.start === refinedOption.end) {
      if (hasNumericRefinement(currentRefinements, '=', refinedOption.start)) {
        resolvedState = resolvedState.removeNumericRefinement(attribute, '=', refinedOption.start);
      } else {
        resolvedState = resolvedState.addNumericRefinement(attribute, '=', refinedOption.start);
      }
      return resolvedState;
    }
  }
  if (refinedOption.start !== undefined) {
    if (hasNumericRefinement(currentRefinements, '>=', refinedOption.start)) {
      resolvedState = resolvedState.removeNumericRefinement(attribute, '>=', refinedOption.start);
    }
    resolvedState = resolvedState.addNumericRefinement(attribute, '>=', refinedOption.start);
  }
  if (refinedOption.end !== undefined) {
    if (hasNumericRefinement(currentRefinements, '<=', refinedOption.end)) {
      resolvedState = resolvedState.removeNumericRefinement(attribute, '<=', refinedOption.end);
    }
    resolvedState = resolvedState.addNumericRefinement(attribute, '<=', refinedOption.end);
  }
  if (typeof resolvedState.page === 'number') {
    resolvedState.page = 0;
  }
  return resolvedState;
}
function hasNumericRefinement(currentRefinements, operator, value) {
  return currentRefinements[operator] !== undefined && currentRefinements[operator].includes(value);
}
function removeEmptyRefinementsFromUiState(indexUiState, attribute) {
  if (!indexUiState.numericMenu) {
    return indexUiState;
  }
  if (indexUiState.numericMenu[attribute] === ':') {
    delete indexUiState.numericMenu[attribute];
  }
  if (Object.keys(indexUiState.numericMenu).length === 0) {
    delete indexUiState.numericMenu;
  }
  return indexUiState;
}
var _default = connectNumericMenu;
exports.default = _default;