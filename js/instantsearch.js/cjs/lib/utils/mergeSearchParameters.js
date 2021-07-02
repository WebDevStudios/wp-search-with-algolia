"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _findIndex = _interopRequireDefault(require("./findIndex"));

var _uniq = _interopRequireDefault(require("./uniq"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
      rest = _objectWithoutProperties(right, ["facets", "disjunctiveFacets", "facetsRefinements", "facetsExcludes", "disjunctiveFacetsRefinements", "numericRefinements", "tagRefinements", "hierarchicalFacets", "hierarchicalFacetsRefinements", "ruleContexts"]);

  return left.setQueryParameters(rest);
}; // Merge facets


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
      var index = (0, _findIndex.default)(facets, function (_) {
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
}; // Merge facet refinements


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
  var ruleContexts = (0, _uniq.default)([].concat(left.ruleContexts).concat(right.ruleContexts).filter(Boolean));

  if (ruleContexts.length > 0) {
    return left.setQueryParameters({
      ruleContexts: ruleContexts
    });
  }

  return left;
};

var merge = function merge() {
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

var _default = merge;
exports.default = _default;