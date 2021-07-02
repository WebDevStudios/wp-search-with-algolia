"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _find = _interopRequireDefault(require("./find"));

var _unescapeRefinement = _interopRequireDefault(require("./unescapeRefinement"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRefinement(state, type, attribute, name) {
  var resultsFacets = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];
  var res = {
    type: type,
    attribute: attribute,
    name: name
  };
  var facet = (0, _find.default)(resultsFacets, function (resultsFacet) {
    return resultsFacet.name === attribute;
  });
  var count;

  if (type === 'hierarchical') {
    (function () {
      var facetDeclaration = state.getHierarchicalFacetByName(attribute);
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
  var includesQuery = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var refinements = [];
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
  Object.keys(facetsRefinements).forEach(function (attribute) {
    var refinementNames = facetsRefinements[attribute];
    refinementNames.forEach(function (refinementName) {
      refinements.push(getRefinement(state, 'facet', attribute, refinementName, results.facets));
    });
  });
  Object.keys(facetsExcludes).forEach(function (attribute) {
    var refinementNames = facetsExcludes[attribute];
    refinementNames.forEach(function (refinementName) {
      refinements.push({
        type: 'exclude',
        attribute: attribute,
        name: refinementName,
        exclude: true
      });
    });
  });
  Object.keys(disjunctiveFacetsRefinements).forEach(function (attribute) {
    var refinementNames = disjunctiveFacetsRefinements[attribute];
    refinementNames.forEach(function (refinementName) {
      refinements.push(getRefinement(state, 'disjunctive', attribute, // We unescape any disjunctive refined values with `unescapeRefinement` because
      // they can be escaped on negative numeric values with `escapeRefinement`.
      (0, _unescapeRefinement.default)(refinementName), results.disjunctiveFacets));
    });
  });
  Object.keys(hierarchicalFacetsRefinements).forEach(function (attribute) {
    var refinementNames = hierarchicalFacetsRefinements[attribute];
    refinementNames.forEach(function (refinement) {
      refinements.push(getRefinement(state, 'hierarchical', attribute, refinement, results.hierarchicalFacets));
    });
  });
  Object.keys(numericRefinements).forEach(function (attribute) {
    var operators = numericRefinements[attribute];
    Object.keys(operators).forEach(function (operatorOriginal) {
      var operator = operatorOriginal;
      var valueOrValues = operators[operator];
      var refinementNames = Array.isArray(valueOrValues) ? valueOrValues : [valueOrValues];
      refinementNames.forEach(function (refinementName) {
        refinements.push({
          type: 'numeric',
          attribute: attribute,
          name: "".concat(refinementName),
          numericValue: refinementName,
          operator: operator
        });
      });
    });
  });
  tagRefinements.forEach(function (refinementName) {
    refinements.push({
      type: 'tag',
      attribute: '_tags',
      name: refinementName
    });
  });

  if (includesQuery && state.query && state.query.trim()) {
    refinements.push({
      attribute: 'query',
      type: 'query',
      name: state.query,
      query: state.query
    });
  }

  return refinements;
}

var _default = getRefinements;
exports.default = _default;