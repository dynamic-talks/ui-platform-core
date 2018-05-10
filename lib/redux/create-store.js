import { applyMiddleware, compose, createStore as reduxCreateStore, combineReducers } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';


/**
 * Create Redux store with basic configuration of middleware, reducers, Redux dev tools, etc.
 *
 * @param {Function|Object} reducers
 * @param {Array|Function} middleware
 * @param {Object} state
 * @param {Function} composeEnhancers
 * @returns {Store<{}>}
 */
export function createStore({ reducers, middleware = [], epics = [], state = {}, composeEnhancers = compose }) {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  if (! Array.isArray(middleware)) {
    middleware = [middleware];
  }

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [/** todo: here could be added initial Redux enhancers */];

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  if (typeof reducers === 'object') {
    reducers = combineReducers(reducers);
  }

  // ======================================================
  // Create redux-observable epics middleware
  // ======================================================
  middleware.push(
    createEpicMiddleware(
      combineEpics.apply({}, epics)
    )
  );

  // ======================================================
  // Enable `Redux-devtool` for current store instance (Only for DEV env)
  // https://github.com/gaearon/redux-devtools
  // ======================================================
  if (typeof window !== 'undefined' && window.__DEV__) {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension;
    }
  }

  return reduxCreateStore(
    reducers,
    state,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
}
