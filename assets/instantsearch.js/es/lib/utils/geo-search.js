function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var latLngRegExp = /^(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)$/;
export function aroundLatLngToPosition(value) {
  var pattern = value.match(latLngRegExp); // Since the value provided is the one send with the request, the API should
  // throw an error due to the wrong format. So throw an error should be safe.

  if (!pattern) {
    throw new Error("Invalid value for \"aroundLatLng\" parameter: \"".concat(value, "\""));
  }

  return {
    lat: parseFloat(pattern[1]),
    lng: parseFloat(pattern[2])
  };
}

function insideBoundingBoxArrayToBoundingBox(value) {
  var _value = _slicedToArray(value, 1),
      _value$ = _value[0];

  _value$ = _value$ === void 0 ? [undefined, undefined, undefined, undefined] : _value$;

  var _value$2 = _slicedToArray(_value$, 4),
      neLat = _value$2[0],
      neLng = _value$2[1],
      swLat = _value$2[2],
      swLng = _value$2[3]; // Since the value provided is the one send with the request, the API should
  // throw an error due to the wrong format. So throw an error should be safe.


  if (!neLat || !neLng || !swLat || !swLng) {
    throw new Error("Invalid value for \"insideBoundingBox\" parameter: [".concat(value, "]"));
  }

  return {
    northEast: {
      lat: neLat,
      lng: neLng
    },
    southWest: {
      lat: swLat,
      lng: swLng
    }
  };
}

function insideBoundingBoxStringToBoundingBox(value) {
  var _value$split$map = value.split(',').map(parseFloat),
      _value$split$map2 = _slicedToArray(_value$split$map, 4),
      neLat = _value$split$map2[0],
      neLng = _value$split$map2[1],
      swLat = _value$split$map2[2],
      swLng = _value$split$map2[3]; // Since the value provided is the one send with the request, the API should
  // throw an error due to the wrong format. So throw an error should be safe.


  if (!neLat || !neLng || !swLat || !swLng) {
    throw new Error("Invalid value for \"insideBoundingBox\" parameter: \"".concat(value, "\""));
  }

  return {
    northEast: {
      lat: neLat,
      lng: neLng
    },
    southWest: {
      lat: swLat,
      lng: swLng
    }
  };
}

export function insideBoundingBoxToBoundingBox(value) {
  if (Array.isArray(value)) {
    return insideBoundingBoxArrayToBoundingBox(value);
  }

  return insideBoundingBoxStringToBoundingBox(value);
}