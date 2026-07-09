function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _excluded = ["classNames", "container", "getEnvironmentProps", "getFormProps", "getInputProps", "getItemProps", "getLabelProps", "getListProps", "getPanelProps", "getRootProps", "panelContainer", "panelPlacement", "render", "renderNoResults", "renderer", "detachedMediaQuery", "components", "translations"];
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import { generateAutocompleteId, invariant, warn } from '@algolia/autocomplete-shared';
import { createElement as preactCreateElement, Fragment as PreactFragment, render } from 'preact';
import { createHighlightComponent, createReverseHighlightComponent, createReverseSnippetComponent, createSnippetComponent } from './components';
import { getHTMLElement, mergeClassNames } from './utils';
var defaultClassNames = {
  clearButton: 'aa-ClearButton',
  detachedCancelButton: 'aa-DetachedCancelButton',
  detachedContainer: 'aa-DetachedContainer',
  detachedFormContainer: 'aa-DetachedFormContainer',
  detachedOverlay: 'aa-DetachedOverlay',
  detachedSearchButton: 'aa-DetachedSearchButton',
  detachedSearchButtonIcon: 'aa-DetachedSearchButtonIcon',
  detachedSearchButtonPlaceholder: 'aa-DetachedSearchButtonPlaceholder',
  detachedSearchButtonQuery: 'aa-DetachedSearchButtonQuery',
  form: 'aa-Form',
  input: 'aa-Input',
  inputWrapper: 'aa-InputWrapper',
  inputWrapperPrefix: 'aa-InputWrapperPrefix',
  inputWrapperSuffix: 'aa-InputWrapperSuffix',
  item: 'aa-Item',
  label: 'aa-Label',
  list: 'aa-List',
  loadingIndicator: 'aa-LoadingIndicator',
  panel: 'aa-Panel',
  panelLayout: 'aa-PanelLayout aa-Panel--scrollable',
  root: 'aa-Autocomplete',
  source: 'aa-Source',
  sourceFooter: 'aa-SourceFooter',
  sourceHeader: 'aa-SourceHeader',
  sourceNoResults: 'aa-SourceNoResults',
  submitButton: 'aa-SubmitButton'
};
var defaultRender = function defaultRender(_ref, root) {
  var children = _ref.children,
    render = _ref.render;
  render(children, root);
};
var defaultRenderer = {
  createElement: preactCreateElement,
  Fragment: PreactFragment,
  render: render
};
export function getDefaultOptions(options) {
  var _core$id;
  var classNames = options.classNames,
    container = options.container,
    getEnvironmentProps = options.getEnvironmentProps,
    getFormProps = options.getFormProps,
    getInputProps = options.getInputProps,
    getItemProps = options.getItemProps,
    getLabelProps = options.getLabelProps,
    getListProps = options.getListProps,
    getPanelProps = options.getPanelProps,
    getRootProps = options.getRootProps,
    panelContainer = options.panelContainer,
    panelPlacement = options.panelPlacement,
    render = options.render,
    renderNoResults = options.renderNoResults,
    renderer = options.renderer,
    detachedMediaQuery = options.detachedMediaQuery,
    components = options.components,
    translations = options.translations,
    core = _objectWithoutProperties(options, _excluded);

  /* eslint-disable no-restricted-globals */
  var environment = typeof window !== 'undefined' ? window : {};
  /* eslint-enable no-restricted-globals */
  var containerElement = getHTMLElement(environment, container);
  invariant(containerElement.tagName !== 'INPUT', 'The `container` option does not support `input` elements. You need to change the container to a `div`.');
  process.env.NODE_ENV !== 'production' ? warn(!(render && renderer && !(renderer !== null && renderer !== void 0 && renderer.render)), "You provided the `render` option but did not provide a `renderer.render`. Since v1.6.0, you can provide a `render` function directly in `renderer`." + "\nTo get rid of this warning, do any of the following depending on your use case." + "\n- If you are using the `render` option only to override Autocomplete's default `render` function, pass the `render` function into `renderer` and remove the `render` option." + '\n- If you are using the `render` option to customize the layout, pass your `render` function into `renderer` and use it from the provided parameters of the `render` option.' + '\n- If you are using the `render` option to work with React 18, pass an empty `render` function into `renderer`.' + '\nSee https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-render') : void 0;
  process.env.NODE_ENV !== 'production' ? warn(!renderer || render || renderer.Fragment && renderer.createElement && renderer.render, "You provided an incomplete `renderer` (missing: ".concat([!(renderer !== null && renderer !== void 0 && renderer.createElement) && '`renderer.createElement`', !(renderer !== null && renderer !== void 0 && renderer.Fragment) && '`renderer.Fragment`', !(renderer !== null && renderer !== void 0 && renderer.render) && '`renderer.render`'].filter(Boolean).join(', '), "). This can cause rendering issues.") + '\nSee https://www.algolia.com/doc/ui-libraries/autocomplete/api-reference/autocomplete-js/autocomplete/#param-renderer') : void 0;
  var defaultedRenderer = _objectSpread(_objectSpread({}, defaultRenderer), renderer);
  var defaultComponents = {
    Highlight: createHighlightComponent(defaultedRenderer),
    ReverseHighlight: createReverseHighlightComponent(defaultedRenderer),
    ReverseSnippet: createReverseSnippetComponent(defaultedRenderer),
    Snippet: createSnippetComponent(defaultedRenderer)
  };
  var defaultTranslations = {
    clearButtonTitle: 'Clear',
    detachedCancelButtonText: 'Cancel',
    detachedSearchButtonTitle: 'Search',
    submitButtonTitle: 'Submit'
  };
  return {
    renderer: {
      classNames: mergeClassNames(defaultClassNames, classNames !== null && classNames !== void 0 ? classNames : {}),
      container: containerElement,
      getEnvironmentProps: getEnvironmentProps !== null && getEnvironmentProps !== void 0 ? getEnvironmentProps : function (_ref2) {
        var props = _ref2.props;
        return props;
      },
      getFormProps: getFormProps !== null && getFormProps !== void 0 ? getFormProps : function (_ref3) {
        var props = _ref3.props;
        return props;
      },
      getInputProps: getInputProps !== null && getInputProps !== void 0 ? getInputProps : function (_ref4) {
        var props = _ref4.props;
        return props;
      },
      getItemProps: getItemProps !== null && getItemProps !== void 0 ? getItemProps : function (_ref5) {
        var props = _ref5.props;
        return props;
      },
      getLabelProps: getLabelProps !== null && getLabelProps !== void 0 ? getLabelProps : function (_ref6) {
        var props = _ref6.props;
        return props;
      },
      getListProps: getListProps !== null && getListProps !== void 0 ? getListProps : function (_ref7) {
        var props = _ref7.props;
        return props;
      },
      getPanelProps: getPanelProps !== null && getPanelProps !== void 0 ? getPanelProps : function (_ref8) {
        var props = _ref8.props;
        return props;
      },
      getRootProps: getRootProps !== null && getRootProps !== void 0 ? getRootProps : function (_ref9) {
        var props = _ref9.props;
        return props;
      },
      panelContainer: panelContainer ? getHTMLElement(environment, panelContainer) : environment.document.body,
      panelPlacement: panelPlacement !== null && panelPlacement !== void 0 ? panelPlacement : 'input-wrapper-width',
      render: render !== null && render !== void 0 ? render : defaultRender,
      renderNoResults: renderNoResults,
      renderer: defaultedRenderer,
      detachedMediaQuery: detachedMediaQuery !== null && detachedMediaQuery !== void 0 ? detachedMediaQuery : getComputedStyle(environment.document.documentElement).getPropertyValue('--aa-detached-media-query'),
      components: _objectSpread(_objectSpread({}, defaultComponents), components),
      translations: _objectSpread(_objectSpread({}, defaultTranslations), translations)
    },
    core: _objectSpread(_objectSpread({}, core), {}, {
      id: (_core$id = core.id) !== null && _core$id !== void 0 ? _core$id : generateAutocompleteId(),
      environment: environment
    })
  };
}