"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _find = _interopRequireDefault(require("./find"));

var _unescapeRefinement = _interopRequireDefault(require("./unescapeRefinement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRefinement(state, type, attributeName, name) {
  var resultsFacets = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
  var res = {
    type: type,
    attributeName: attributeName,
    name: name
  };
  var facet = (0, _find.default)(resultsFacets, function (resultsFacet) {
    return resultsFacet.name === attributeName;
  });
  var count;

  if (type === 'hierarchical') {
    (function () {
      var facetDeclaration = state.getHierarchicalFacetByName(attributeName);
      var nameParts = name.split(facetDeclaration.separator);

      var getFacetRefinement = function getFacetRefinement(facetData) {
        return function (refinementKey) {
          return facetData[refinementKey];
        };
      };

      var _loop = function _loop(i) {
        facet = facet && facet.data && (0, _find.default)(Object.keys(facet.data).map(getFacetRefinement(facet.data)), function (refinement) {
          return refinement.name === nameParts[i];
        });
      };

      for (var i = 0; facet !== undefined && i < nameParts.length; ++i) {
        _loop(i);
      }

      count = facet && facet.count;
    })();
  } else {
    count = facet && facet.data && facet.data[res.name];
  }

  var exhaustive = facet && facet.exhaustive;

  if (count !== undefined) {
    res.count = count;
  }

  if (exhaustive !== undefined) {
    res.exhaustive = exhaustive;
  }

  return res;
}

function getRefinements(results, state) {
  var clearsQuery = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var res = [];
  var _state$facetsRefineme = state.facetsRefinements,
      facetsRefinements = _state$facetsRefineme === void 0 ? {} : _state$facetsRefineme,
      _state$facetsExcludes = state.facetsExcludes,
      facetsExcludes = _state$facetsExcludes === void 0 ? {} : _state$facetsExcludes,
      _state$disjunctiveFac = state.disjunctiveFacetsRefinements,
      disjunctiveFacetsRefinements = _state$disjunctiveFac === void 0 ? {} : _state$disjunctiveFac,
      _state$hierarchicalFa = state.hierarchicalFacetsRefinements,
      hierarchicalFacetsRefinements = _state$hierarchicalFa === void 0 ? {} : _state$hierarchicalFa,
      _state$numericRefinem = state.numericRefinements,
      numericRefinements = _state$numericRefinem === void 0 ? {} : _state$numericRefinem,
      _state$tagRefinements = state.tagRefinements,
      tagRefinements = _state$tagRefinements === void 0 ? [] : _state$tagRefinements;
  Object.keys(facetsRefinements).forEach(function (attributeName) {
    var refinements = facetsRefinements[attributeName];
    refinements.forEach(function (refinement) {
      res.push(getRefinement(state, 'facet', attributeName, refinement, results.facets));
    });
  });
  Object.keys(facetsExcludes).forEach(function (attributeName) {
    var refinements = facetsExcludes[attributeName];
    refinements.forEach(function (refinement) {
      res.push({
        type: 'exclude',
        attributeName: attributeName,
        name: refinement,
        exclude: true
      });
    });
  });
  Object.keys(disjunctiveFacetsRefinements).forEach(function (attributeName) {
    var refinements = disjunctiveFacetsRefinements[attributeName];
    refinements.forEach(function (refinement) {
      res.push(getRefinement(state, 'disjunctive', attributeName, // We unescape any disjunctive refined values with `unescapeRefinement` because
      // they can be escaped on negative numeric values with `escapeRefinement`.
      (0, _unescapeRefinement.default)(refinement), results.disjunctiveFacets));
    });
  });
  Object.keys(hierarchicalFacetsRefinements).forEach(function (attributeName) {
    var refinements = hierarchicalFacetsRefinements[attributeName];
    refinements.forEach(function (refinement) {
      res.push(getRefinement(state, 'hierarchical', attributeName, refinement, results.hierarchicalFacets));
    });
  });
  Object.keys(numericRefinements).forEach(function (attributeName) {
    var operators = numericRefinements[attributeName];
    Object.keys(operators).forEach(function (operator) {
      var valueOrValues = operators[operator];
      var refinements = Array.isArray(valueOrValues) ? valueOrValues : [valueOrValues];
      refinements.forEach(function (refinement) {
        res.push({
          type: 'numeric',
          attributeName: attributeName,
          name: "".concat(refinement),
          numericValue: refinement,
          operator: operator
        });
      });
    });
  });
  tagRefinements.forEach(function (refinement) {
    res.push({
      type: 'tag',
      attributeName: '_tags',
      name: refinement
    });
  });

  if (clearsQuery && state.query && state.query.trim()) {
    res.push({
      attributeName: 'query',
      type: 'query',
      name: state.query,
      query: state.query
    });
  }

  return res;
}

var _default = getRefinements;
exports.default = _default;