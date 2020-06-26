'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /* eslint-env mocha */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _expectJsx = require('expect-jsx');

var _expectJsx2 = _interopRequireDefault(_expectJsx);

var _algoliasearchHelper = require('algoliasearch-helper');

var _algoliasearchHelper2 = _interopRequireDefault(_algoliasearchHelper);

var _infiniteHits = require('../infinite-hits');

var _infiniteHits2 = _interopRequireDefault(_infiniteHits);

var _InfiniteHits = require('../../../components/InfiniteHits');

var _InfiniteHits2 = _interopRequireDefault(_InfiniteHits);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_expect2.default.extend(_expectJsx2.default);

describe('infiniteHits call', function () {
  it('throws an exception when no container', function () {
    (0, _expect2.default)(_infiniteHits2.default).toThrow(/^Must provide a container/);
  });
});

describe('infiniteHits()', function () {
  var ReactDOM = void 0;
  var container = void 0;
  var templateProps = void 0;
  var widget = void 0;
  var results = void 0;
  var props = void 0;
  var helper = void 0;
  var defaultTemplates = {
    hit: 'hit',
    empty: 'empty'
  };

  beforeEach(function () {
    helper = (0, _algoliasearchHelper2.default)({ addAlgoliaAgent: function addAlgoliaAgent() {} });
    helper.search = _sinon2.default.spy();

    ReactDOM = { render: _sinon2.default.spy() };
    _infiniteHits2.default.__Rewire__('ReactDOM', ReactDOM);
    _infiniteHits2.default.__Rewire__('defaultTemplates', defaultTemplates);

    container = document.createElement('div');
    templateProps = {
      transformData: undefined,
      templatesConfig: undefined,
      templates: defaultTemplates,
      useCustomCompileOptions: { hit: false, empty: false }
    };
    widget = (0, _infiniteHits2.default)({ container: container, cssClasses: { root: ['root', 'cx'] } });
    widget.init({ helper: helper });
    results = { hits: [{ first: 'hit', second: 'hit' }] };
  });

  it('configures hitsPerPage', function () {
    (0, _expect2.default)(widget.getConfiguration()).toEqual({ hitsPerPage: 20 });
  });

  it('calls twice ReactDOM.render(<Hits props />, container)', function () {
    props = getProps();
    var state = { page: 0 };
    widget.render({ results: results, state: state });
    widget.render({ results: results, state: state });

    (0, _expect2.default)(ReactDOM.render.calledTwice).toBe(true, 'ReactDOM.render called twice');
    (0, _expect2.default)(ReactDOM.render.firstCall.args[0]).toEqualJSX(_react2.default.createElement(_InfiniteHits2.default, props));
    (0, _expect2.default)(ReactDOM.render.firstCall.args[1]).toEqual(container);
    (0, _expect2.default)(ReactDOM.render.secondCall.args[0]).toEqualJSX(_react2.default.createElement(_InfiniteHits2.default, props));
    (0, _expect2.default)(ReactDOM.render.secondCall.args[1]).toEqual(container);
  });

  it('if it is the last page, then the props should contain isLastPage true', function () {
    props = getProps();
    var state = { page: 0 };
    widget.render({
      results: _extends({}, results, { page: 0, nbPages: 2 }),
      state: state
    });
    widget.render({
      results: _extends({}, results, { page: 1, nbPages: 2 }),
      state: state
    });

    (0, _expect2.default)(ReactDOM.render.calledTwice).toBe(true, 'ReactDOM.render called twice');
    var propsWithIsLastPageFalse = _extends({}, getProps(_extends({}, results, { page: 0, nbPages: 2 })), { isLastPage: false });
    (0, _expect2.default)(ReactDOM.render.firstCall.args[0]).toEqualJSX(_react2.default.createElement(_InfiniteHits2.default, propsWithIsLastPageFalse));
    (0, _expect2.default)(ReactDOM.render.firstCall.args[1]).toEqual(container);
    var propsWithIsLastPageTrue = _extends({}, getProps(_extends({}, results, { page: 1, nbPages: 2 })), { isLastPage: true });
    (0, _expect2.default)(ReactDOM.render.secondCall.args[0]).toEqualJSX(_react2.default.createElement(_InfiniteHits2.default, propsWithIsLastPageTrue));
    (0, _expect2.default)(ReactDOM.render.secondCall.args[1]).toEqual(container);
  });

  it('does not accept both item and allItems templates', function () {
    (0, _expect2.default)(_infiniteHits2.default.bind({ container: container, templates: { item: '', allItems: '' } })).toThrow();
  });

  it('updates the search state properly when showMore is called', function () {
    (0, _expect2.default)(helper.state.page).toBe(0);

    widget.showMore();

    (0, _expect2.default)(helper.state.page).toBe(1);
    (0, _expect2.default)(helper.search.callCount).toBe(1);
  });

  afterEach(function () {
    _infiniteHits2.default.__ResetDependency__('ReactDOM');
    _infiniteHits2.default.__ResetDependency__('defaultTemplates');
  });

  function getProps(otherResults) {
    return {
      hits: (otherResults || results).hits,
      results: otherResults || results,
      templateProps: templateProps,
      cssClasses: {
        root: 'ais-infinite-hits root cx',
        item: 'ais-infinite-hits--item',
        empty: 'ais-infinite-hits__empty',
        showmore: 'ais-infinite-hits--showmore'
      },
      showMore: function showMore() {},
      showMoreLabel: 'Show more results',
      isLastPage: false
    };
  }
});