function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SimpleUIStateMapping =
/*#__PURE__*/
function () {
  function SimpleUIStateMapping() {
    _classCallCheck(this, SimpleUIStateMapping);
  }

  _createClass(SimpleUIStateMapping, [{
    key: "stateToRoute",
    value: function stateToRoute(uiState) {
      return uiState;
    }
  }, {
    key: "routeToState",
    value: function routeToState(routeState) {
      return routeState;
    }
  }]);

  return SimpleUIStateMapping;
}();

export default function () {
  return new SimpleUIStateMapping();
}