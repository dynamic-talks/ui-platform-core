'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.createStore = createStore;

var _libioc = require('libioc');

var _redux = require('redux');

var _reduxObservable = require('redux-observable');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Create Redux store with basic configuration of middleware, reducers, Redux dev tools, etc.
 *
 * @param {Function|Object} reducers
 * @param {Array|Function} middleware
 * @param {Object} state
 * @param {Array} epics
 * @param {Function} composeEnhancers
 * @param {IoCContainer} ioc
 * @returns {Store<{}>}
 */
function createStore(_ref) {
  var reducers = _ref.reducers,
      _ref$middleware = _ref.middleware,
      middleware = _ref$middleware === undefined ? [] : _ref$middleware,
      _ref$epics = _ref.epics,
      epics = _ref$epics === undefined ? [] : _ref$epics,
      _ref$state = _ref.state,
      state = _ref$state === undefined ? {} : _ref$state,
      _ref$composeEnhancers = _ref.composeEnhancers,
      composeEnhancers = _ref$composeEnhancers === undefined ? _redux.compose : _ref$composeEnhancers,
      _ref$ioc = _ref.ioc,
      ioc = _ref$ioc === undefined ? new _libioc.IoCContainer() : _ref$ioc;

  // ======================================================
  // Middleware Configuration
  // ======================================================
  if (!Array.isArray(middleware)) {
    middleware = [middleware];
  }

  // ======================================================
  // Store Enhancers
  // ======================================================
  var enhancers = [/** todo: here could be added initial Redux enhancers */];

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  if ((typeof reducers === 'undefined' ? 'undefined' : _typeof(reducers)) === 'object') {
    reducers = (0, _redux.combineReducers)(reducers);
  }

  // ======================================================
  // Create redux-observable epics middleware
  // ======================================================
  var epicDeps = epics
  // filter epics with declared deps
  .filter(function (epicItem) {
    return Array.isArray(epicItem.$inject);
  })
  // gather deps into single dep list with unique values
  .reduce(function (res, _ref2) {
    var $inject = _ref2.$inject;
    return res.concat($inject.filter(function (dep) {
      return !res.includes(dep);
    }));
  }, []);

  middleware.push((0, _reduxObservable.createEpicMiddleware)(_reduxObservable.combineEpics.apply({}, epics), { dependencies: ioc.resolveAll(epicDeps) }));

  // ======================================================
  // Enable `Redux-devtool` for current store instance (Only for DEV env)
  // https://github.com/gaearon/redux-devtools
  // ======================================================
  if (typeof window !== 'undefined' && window.__DEV__) {
    var composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension;
    }
  }

  return (0, _redux.createStore)(reducers, state, composeEnhancers.apply(undefined, [_redux.applyMiddleware.apply(undefined, _toConsumableArray(middleware))].concat(enhancers)));
}