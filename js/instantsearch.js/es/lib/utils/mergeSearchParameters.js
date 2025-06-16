function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["facets", "disjunctiveFacets", "facetsRefinements", "facetsExcludes", "disjunctiveFacetsRefinements", "numericRefinements", "tagRefinements", "hierarchicalFacets", "hierarchicalFacetsRefinements", "ruleContexts"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import { findIndex } from "./findIndex.js";
import { uniq } from "./uniq.js";
var mergeWithRest = function mergeWithRest(left, right) {
  var facets = right.facets,
    disjunctiveFacets = right.disjunctiveFacets,
    facetsRefinements = right.facetsRefinements,
    facetsExcludes = right.facetsExcludes,
    disjunctiveFacetsRefinements = right.disjunctiveFacetsRefinements,
    numericRefinements = right.numericRefinements,
    tagRefinements = right.tagRefinements,
    hierarchicalFacets = right.hierarchicalFacets,
    hierarchicalFacetsRefinements = right.hierarchicalFacetsRefinements,
    ruleContexts = right.ruleContexts,
    rest = _objectWithoutProperties(right, _excluded);
  return left.setQueryParameters(rest);
};

// Merge facets
var mergeFacets = function mergeFacets(left, right) {
  return right.facets.reduce(function (_, name) {
    return _.addFacet(name);
  }, left);
};
var mergeDisjunctiveFacets = function mergeDisjunctiveFacets(left, right) {
  return right.disjunctiveFacets.reduce(function (_, name) {
    return _.addDisjunctiveFacet(name);
  }, left);
};
var mergeHierarchicalFacets = function mergeHierarchicalFacets(left, right) {
  return left.setQueryParameters({
    hierarchicalFacets: right.hierarchicalFacets.reduce(function (facets, facet) {
      var index = findIndex(facets, function (_) {
        return _.name === facet.name;
      });
      if (index === -1) {
        return facets.concat(facet);
      }
      var nextFacets = facets.slice();
      nextFacets.splice(index, 1, facet);
      return nextFacets;
    }, left.hierarchicalFacets)
  });
};

// Merge facet refinements
var mergeTagRefinements = function mergeTagRefinements(left, right) {
  return right.tagRefinements.reduce(function (_, value) {
    return _.addTagRefinement(value);
  }, left);
};
var mergeFacetRefinements = function mergeFacetRefinements(left, right) {
  return left.setQueryParameters({
    facetsRefinements: _objectSpread(_objectSpread({}, left.facetsRefinements), right.facetsRefinements)
  });
};
var mergeFacetsExcludes = function mergeFacetsExcludes(left, right) {
  return left.setQueryParameters({
    facetsExcludes: _objectSpread(_objectSpread({}, left.facetsExcludes), right.facetsExcludes)
  });
};
var mergeDisjunctiveFacetsRefinements = function mergeDisjunctiveFacetsRefinements(left, right) {
  return left.setQueryParameters({
    disjunctiveFacetsRefinements: _objectSpread(_objectSpread({}, left.disjunctiveFacetsRefinements), right.disjunctiveFacetsRefinements)
  });
};
var mergeNumericRefinements = function mergeNumericRefinements(left, right) {
  return left.setQueryParameters({
    numericRefinements: _objectSpread(_objectSpread({}, left.numericRefinements), right.numericRefinements)
  });
};
var mergeHierarchicalFacetsRefinements = function mergeHierarchicalFacetsRefinements(left, right) {
  return left.setQueryParameters({
    hierarchicalFacetsRefinements: _objectSpread(_objectSpread({}, left.hierarchicalFacetsRefinements), right.hierarchicalFacetsRefinements)
  });
};
var mergeRuleContexts = function mergeRuleContexts(left, right) {
  var ruleContexts = uniq([].concat(left.ruleContexts).concat(right.ruleContexts).filter(Boolean));
  if (ruleContexts.length > 0) {
    return left.setQueryParameters({
      ruleContexts: ruleContexts
    });
  }
  return left;
};
export var mergeSearchParameters = function mergeSearchParameters() {
  for (var _len = arguments.length, parameters = new Array(_len), _key = 0; _key < _len; _key++) {
    parameters[_key] = arguments[_key];
  }
  return parameters.reduce(function (left, right) {
    var hierarchicalFacetsRefinementsMerged = mergeHierarchicalFacetsRefinements(left, right);
    var hierarchicalFacetsMerged = mergeHierarchicalFacets(hierarchicalFacetsRefinementsMerged, right);
    var tagRefinementsMerged = mergeTagRefinements(hierarchicalFacetsMerged, right);
    var numericRefinementsMerged = mergeNumericRefinements(tagRefinementsMerged, right);
    var disjunctiveFacetsRefinementsMerged = mergeDisjunctiveFacetsRefinements(numericRefinementsMerged, right);
    var facetsExcludesMerged = mergeFacetsExcludes(disjunctiveFacetsRefinementsMerged, right);
    var facetRefinementsMerged = mergeFacetRefinements(facetsExcludesMerged, right);
    var disjunctiveFacetsMerged = mergeDisjunctiveFacets(facetRefinementsMerged, right);
    var ruleContextsMerged = mergeRuleContexts(disjunctiveFacetsMerged, right);
    var facetsMerged = mergeFacets(ruleContextsMerged, right);
    return mergeWithRest(facetsMerged, right);
  });
};