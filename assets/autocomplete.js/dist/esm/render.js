function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/** @jsxRuntime classic */
/** @jsx renderer.createElement */

import { setProperties, setPropertiesWithoutEvents } from './utils';
export function renderSearchBox(_ref) {
  var autocomplete = _ref.autocomplete,
    autocompleteScopeApi = _ref.autocompleteScopeApi,
    dom = _ref.dom,
    propGetters = _ref.propGetters,
    state = _ref.state;
  setPropertiesWithoutEvents(dom.root, propGetters.getRootProps(_objectSpread({
    state: state,
    props: autocomplete.getRootProps({})
  }, autocompleteScopeApi)));
  setPropertiesWithoutEvents(dom.input, propGetters.getInputProps(_objectSpread({
    state: state,
    props: autocomplete.getInputProps({
      inputElement: dom.input
    }),
    inputElement: dom.input
  }, autocompleteScopeApi)));
  setProperties(dom.label, {
    hidden: state.status === 'stalled'
  });
  setProperties(dom.loadingIndicator, {
    hidden: state.status !== 'stalled'
  });
  toggleAnimation(dom.loadingIndicator, state.status === 'stalled');
  setProperties(dom.clearButton, {
    hidden: !state.query
  });
  setProperties(dom.detachedSearchButtonQuery, {
    textContent: state.query
  });
  setProperties(dom.detachedSearchButtonPlaceholder, {
    hidden: Boolean(state.query)
  });
}

// Safari will animate the SVG even when it's hidden. We need to pause the
// animation manually. See:
// - https://github.com/algolia/autocomplete/issues/1322
// - https://bugs.webkit.org/show_bug.cgi?id=298217
function toggleAnimation(element, isActive) {
  var _element$firstChild;
  var svgElement = ((_element$firstChild = element.firstChild) === null || _element$firstChild === void 0 ? void 0 : _element$firstChild.nodeName) === 'svg' ? element.firstChild : null;
  if (!svgElement || !svgElement.pauseAnimations || !svgElement.unpauseAnimations) {
    return;
  }
  if (isActive) {
    svgElement.unpauseAnimations();
  } else {
    svgElement.pauseAnimations();
  }
}
export function renderPanel(render, _ref2) {
  var autocomplete = _ref2.autocomplete,
    autocompleteScopeApi = _ref2.autocompleteScopeApi,
    classNames = _ref2.classNames,
    html = _ref2.html,
    dom = _ref2.dom,
    panelContainer = _ref2.panelContainer,
    propGetters = _ref2.propGetters,
    state = _ref2.state,
    components = _ref2.components,
    renderer = _ref2.renderer;
  if (!state.isOpen) {
    if (panelContainer.contains(dom.panel)) {
      panelContainer.removeChild(dom.panel);
    }
    return;
  }

  // We add the panel element to the DOM when it's not yet appended and that the
  // items are fetched.
  if (!panelContainer.contains(dom.panel) && state.status !== 'loading') {
    panelContainer.appendChild(dom.panel);
  }
  dom.panel.classList.toggle('aa-Panel--stalled', state.status === 'stalled');
  var sections = state.collections.filter(function (_ref3) {
    var source = _ref3.source,
      items = _ref3.items;
    return source.templates.noResults || items.length > 0;
  }).map(function (_ref4, sourceIndex) {
    var source = _ref4.source,
      items = _ref4.items;
    return renderer.createElement("section", {
      key: sourceIndex,
      className: classNames.source,
      "data-autocomplete-source-id": source.sourceId
    }, source.templates.header && renderer.createElement("div", {
      className: classNames.sourceHeader
    }, source.templates.header({
      components: components,
      createElement: renderer.createElement,
      Fragment: renderer.Fragment,
      items: items,
      source: source,
      state: state,
      html: html
    })), source.templates.noResults && items.length === 0 ? renderer.createElement("div", {
      className: classNames.sourceNoResults
    }, source.templates.noResults({
      components: components,
      createElement: renderer.createElement,
      Fragment: renderer.Fragment,
      source: source,
      state: state,
      html: html
    })) : renderer.createElement("ul", _extends({
      className: classNames.list
    }, propGetters.getListProps(_objectSpread({
      state: state,
      props: autocomplete.getListProps({
        source: source
      })
    }, autocompleteScopeApi))), items.map(function (item) {
      var itemProps = autocomplete.getItemProps({
        item: item,
        source: source
      });
      return renderer.createElement("li", _extends({
        key: itemProps.id,
        className: classNames.item
      }, propGetters.getItemProps(_objectSpread({
        state: state,
        props: itemProps
      }, autocompleteScopeApi))), source.templates.item({
        components: components,
        createElement: renderer.createElement,
        Fragment: renderer.Fragment,
        item: item,
        state: state,
        html: html
      }));
    })), source.templates.footer && renderer.createElement("div", {
      className: classNames.sourceFooter
    }, source.templates.footer({
      components: components,
      createElement: renderer.createElement,
      Fragment: renderer.Fragment,
      items: items,
      source: source,
      state: state,
      html: html
    })));
  });
  var children = renderer.createElement(renderer.Fragment, null, renderer.createElement("div", {
    className: classNames.panelLayout
  }, sections), renderer.createElement("div", {
    className: "aa-GradientBottom"
  }));
  var elements = sections.reduce(function (acc, current) {
    acc[current.props['data-autocomplete-source-id']] = current;
    return acc;
  }, {});
  render(_objectSpread(_objectSpread({
    children: children,
    state: state,
    sections: sections,
    elements: elements
  }, renderer), {}, {
    components: components,
    html: html
  }, autocompleteScopeApi), dom.panel);
}