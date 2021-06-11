export function convertNumericRefinementsToFilters(state, attribute) {
  if (!state) {
    return null;
  }

  var filtersObj = state.numericRefinements[attribute];
  /*
    filtersObj === {
      "<=": [10],
      "=": [],
      ">=": [5]
    }
  */

  var filters = [];
  Object.keys(filtersObj).filter(function (operator) {
    return Array.isArray(filtersObj[operator]) && filtersObj[operator].length > 0;
  }).forEach(function (operator) {
    filtersObj[operator].forEach(function (value) {
      filters.push("".concat(attribute).concat(operator).concat(value));
    });
  });
  return filters;
}