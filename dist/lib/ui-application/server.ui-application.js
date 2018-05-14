'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServerUiApplication = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _uiApplication = require('./ui-application');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ServerUiApplication = exports.ServerUiApplication = function (_UiApplication) {
  _inherits(ServerUiApplication, _UiApplication);

  function ServerUiApplication() {
    _classCallCheck(this, ServerUiApplication);

    return _possibleConstructorReturn(this, (ServerUiApplication.__proto__ || Object.getPrototypeOf(ServerUiApplication)).apply(this, arguments));
  }

  _createClass(ServerUiApplication, [{
    key: 'getClientConfig',
    value: function getClientConfig() {
      return this._config.getClientConfig();
    }
  }, {
    key: 'render',
    value: function render() {
      var renderedModules = [];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._modules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var module = _step.value;

          if (module.render) {
            var _module$render = module.render,
                component = _module$render.component,
                id = _module$render.id;


            renderedModules.push({
              id: id || 'root',
              html: _server2.default.renderToString(this.renderApp(component))
            });
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return renderedModules;
    }
  }]);

  return ServerUiApplication;
}(_uiApplication.UiApplication);

ServerUiApplication.$inject = ['ioc', 'config'];