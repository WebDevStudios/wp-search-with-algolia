function getPropertyByPath(object, path) {
  var parts = path.split('.');
  return parts.reduce(function (current, key) {
    return current && current[key];
  }, object);
}

export default getPropertyByPath;