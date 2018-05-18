'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withReduxProvider = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var withReduxProvider = exports.withReduxProvider = function withReduxProvider(store) {
  return function (Component) {
    var ReduxProvider = function ReduxProvider(props) {
      return _react2.default.createElement(
        _reactRedux.Provider,
        _extends({
          store: store
        }, props),
        _react2.default.createElement(Component, null)
      );
    };

    return ReduxProvider;
  };
};