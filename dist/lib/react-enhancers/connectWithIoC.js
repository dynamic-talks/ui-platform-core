'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.connectWithIoC = connectWithIoC;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _recompose = require('recompose');

var _libioc = require('libioc');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Connect React component to TRU specific dependencies from the IoC container.
 * This connector function should be used along with `<ServiceProvider/>`.
 *
 * @param {Array} dependencies - list of dependencies which should be retrieved from the IoC container
 * @returns {Function}
 */
function connectWithIoC(dependencies) {
  return function (Component) {
    var ConnectedWithIoC = function ConnectedWithIoC(props, _ref) {
      var iocContainer = _ref.iocContainer;


      if (!iocContainer) {
        throw new Error('[connectWithIoC] "iocContainer" isn\'t found in context');
      }

      if (!Array.isArray(dependencies)) {
        throw new Error('[connectWithIoC] Unrecognized \'dependencies\' definition, it should be an array, but received: ' + (typeof dependencies === 'undefined' ? 'undefined' : _typeof(dependencies)));
      }

      var serviceSet = dependencies.reduce(function (res, serviceName) {
        var service = iocContainer.resolve(serviceName);

        if (typeof service === 'undefined') {
          throw new Error('[connectWithIoC] Declared "' + serviceName + '" isn\'t found in IocContainer');
        }

        res[serviceName] = service;

        return res;
      }, {});

      return _react2.default.createElement(Component, _extends({}, props, serviceSet));
    };

    ConnectedWithIoC.displayName = 'ConnectedWithIoC(' + (0, _recompose.getDisplayName)(Component) + ')';
    ConnectedWithIoC.contextTypes = {
      iocContainer: _propTypes2.default.instanceOf(_libioc.IoCContainer).isRequired
    };

    return ConnectedWithIoC;
  };
}