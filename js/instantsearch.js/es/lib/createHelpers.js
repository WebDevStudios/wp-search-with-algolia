function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { highlight as _highlight, reverseHighlight as _reverseHighlight, snippet as _snippet, reverseSnippet as _reverseSnippet, insights as _insights } from '../helpers';
export default function hoganHelpers(_ref) {
  var numberLocale = _ref.numberLocale;
  return {
    formatNumber: function formatNumber(value, render) {
      return Number(render(value)).toLocaleString(numberLocale);
    },
    highlight: function highlight(options, render) {
      try {
        var highlightOptions = JSON.parse(options);
        return render(_highlight(_objectSpread({}, highlightOptions, {
          hit: this
        })));
      } catch (error) {
        throw new Error("\nThe highlight helper expects a JSON object of the format:\n{ \"attribute\": \"name\", \"highlightedTagName\": \"mark\" }");
      }
    },
    reverseHighlight: function reverseHighlight(options, render) {
      try {
        var reverseHighlightOptions = JSON.parse(options);
        return render(_reverseHighlight(_objectSpread({}, reverseHighlightOptions, {
          hit: this
        })));
      } catch (error) {
        throw new Error("\n  The reverseHighlight helper expects a JSON object of the format:\n  { \"attribute\": \"name\", \"highlightedTagName\": \"mark\" }");
      }
    },
    snippet: function snippet(options, render) {
      try {
        var snippetOptions = JSON.parse(options);
        return render(_snippet(_objectSpread({}, snippetOptions, {
          hit: this
        })));
      } catch (error) {
        throw new Error("\nThe snippet helper expects a JSON object of the format:\n{ \"attribute\": \"name\", \"highlightedTagName\": \"mark\" }");
      }
    },
    reverseSnippet: function reverseSnippet(options, render) {
      try {
        var reverseSnippetOptions = JSON.parse(options);
        return render(_reverseSnippet(_objectSpread({}, reverseSnippetOptions, {
          hit: this
        })));
      } catch (error) {
        throw new Error("\n  The reverseSnippet helper expects a JSON object of the format:\n  { \"attribute\": \"name\", \"highlightedTagName\": \"mark\" }");
      }
    },
    insights: function insights(options, render) {
      try {
        var _JSON$parse = JSON.parse(options),
            method = _JSON$parse.method,
            payload = _JSON$parse.payload;

        return render(_insights(method, _objectSpread({
          objectIDs: [this.objectID]
        }, payload)));
      } catch (error) {
        throw new Error("\nThe insights helper expects a JSON object of the format:\n{ \"method\": \"method-name\", \"payload\": { \"eventName\": \"name of the event\" } }");
      }
    }
  };
}