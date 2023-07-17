function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
import { capitalize } from "./capitalize.js";
import { warning } from "./logger.js";
import { keys } from "./typedObject.js";
// Some connectors are responsible for multiple widgets so we need
// to map them.
function getWidgetNames(connectorName) {
  switch (connectorName) {
    case 'range':
      return [];
    case 'menu':
      return ['menu', 'menuSelect'];
    default:
      return [connectorName];
  }
}
var stateToWidgetsMap = {
  query: {
    connectors: ['connectSearchBox'],
    widgets: ['ais.searchBox', 'ais.autocomplete', 'ais.voiceSearch']
  },
  refinementList: {
    connectors: ['connectRefinementList'],
    widgets: ['ais.refinementList']
  },
  menu: {
    connectors: ['connectMenu'],
    widgets: ['ais.menu']
  },
  hierarchicalMenu: {
    connectors: ['connectHierarchicalMenu'],
    widgets: ['ais.hierarchicalMenu']
  },
  numericMenu: {
    connectors: ['connectNumericMenu'],
    widgets: ['ais.numericMenu']
  },
  ratingMenu: {
    connectors: ['connectRatingMenu'],
    widgets: ['ais.ratingMenu']
  },
  range: {
    connectors: ['connectRange'],
    widgets: ['ais.rangeInput', 'ais.rangeSlider', 'ais.range']
  },
  toggle: {
    connectors: ['connectToggleRefinement'],
    widgets: ['ais.toggleRefinement']
  },
  geoSearch: {
    connectors: ['connectGeoSearch'],
    widgets: ['ais.geoSearch']
  },
  sortBy: {
    connectors: ['connectSortBy'],
    widgets: ['ais.sortBy']
  },
  page: {
    connectors: ['connectPagination'],
    widgets: ['ais.pagination', 'ais.infiniteHits']
  },
  hitsPerPage: {
    connectors: ['connectHitsPerPage'],
    widgets: ['ais.hitsPerPage']
  },
  configure: {
    connectors: ['connectConfigure'],
    widgets: ['ais.configure']
  },
  places: {
    connectors: [],
    widgets: ['ais.places']
  }
};
export function checkIndexUiState(_ref) {
  var index = _ref.index,
    indexUiState = _ref.indexUiState;
  var mountedWidgets = index.getWidgets().map(function (widget) {
    return widget.$$type;
  }).filter(Boolean);
  var missingWidgets = keys(indexUiState).reduce(function (acc, parameter) {
    var widgetUiState = stateToWidgetsMap[parameter];
    if (!widgetUiState) {
      return acc;
    }
    var requiredWidgets = widgetUiState.widgets;
    if (requiredWidgets && !requiredWidgets.some(function (requiredWidget) {
      return mountedWidgets.includes(requiredWidget);
    })) {
      acc.push([parameter, {
        connectors: widgetUiState.connectors,
        widgets: widgetUiState.widgets.map(function (widgetIdentifier) {
          return widgetIdentifier.split('ais.')[1];
        })
      }]);
    }
    return acc;
  }, []);
  process.env.NODE_ENV === 'development' ? warning(missingWidgets.length === 0, "The UI state for the index \"".concat(index.getIndexId(), "\" is not consistent with the widgets mounted.\n\nThis can happen when the UI state is specified via `initialUiState`, `routing` or `setUiState` but that the widgets responsible for this state were not added. This results in those query parameters not being sent to the API.\n\nTo fully reflect the state, some widgets need to be added to the index \"").concat(index.getIndexId(), "\":\n\n").concat(missingWidgets.map(function (_ref2) {
    var _ref4;
    var _ref3 = _slicedToArray(_ref2, 2),
      stateParameter = _ref3[0],
      widgets = _ref3[1].widgets;
    return "- `".concat(stateParameter, "` needs one of these widgets: ").concat((_ref4 = []).concat.apply(_ref4, _toConsumableArray(widgets.map(function (name) {
      return getWidgetNames(name);
    }))).map(function (name) {
      return "\"".concat(name, "\"");
    }).join(', '));
  }).join('\n'), "\n\nIf you do not wish to display widgets but still want to support their search parameters, you can mount \"virtual widgets\" that don't render anything:\n\n```\n").concat(missingWidgets.filter(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
      _stateParameter = _ref6[0],
      connectors = _ref6[1].connectors;
    return connectors.length > 0;
  }).map(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2),
      _stateParameter = _ref8[0],
      _ref8$ = _ref8[1],
      connectors = _ref8$.connectors,
      widgets = _ref8$.widgets;
    var capitalizedWidget = capitalize(widgets[0]);
    var connectorName = connectors[0];
    return "const virtual".concat(capitalizedWidget, " = ").concat(connectorName, "(() => null);");
  }).join('\n'), "\n\nsearch.addWidgets([\n  ").concat(missingWidgets.filter(function (_ref9) {
    var _ref10 = _slicedToArray(_ref9, 2),
      _stateParameter = _ref10[0],
      connectors = _ref10[1].connectors;
    return connectors.length > 0;
  }).map(function (_ref11) {
    var _ref12 = _slicedToArray(_ref11, 2),
      _stateParameter = _ref12[0],
      widgets = _ref12[1].widgets;
    var capitalizedWidget = capitalize(widgets[0]);
    return "virtual".concat(capitalizedWidget, "({ /* ... */ })");
  }).join(',\n  '), "\n]);\n```\n\nIf you're using custom widgets that do set these query parameters, we recommend using connectors instead.\n\nSee https://www.algolia.com/doc/guides/building-search-ui/widgets/customize-an-existing-widget/js/#customize-the-complete-ui-of-the-widgets")) : void 0;
}