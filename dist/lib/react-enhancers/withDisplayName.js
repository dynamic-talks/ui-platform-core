'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapDisplayName = undefined;

var _recompose = require('recompose');

/**
 * Update displayName of React Component with supplied `nameWrapper`
 * E.g origin displayName = "MyComponent" and nameWrapper = "connect" ==> "connect(MyComponent)"
 *
 * @param {React.Component} Component
 * @param {String} nameWrapper
 */
var wrapDisplayName = exports.wrapDisplayName = function wrapDisplayName(Component, nameWrapper) {
  return (0, _recompose.setDisplayName)((0, _recompose.wrapDisplayName)((0, _recompose.getDisplayName)(Component), nameWrapper));
};