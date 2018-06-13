'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServerConfiguration = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash.pick');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.merge');

var _lodash4 = _interopRequireDefault(_lodash3);

var _Configuration2 = require('./Configuration');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Extends `Configuration` class with server specific functionality like creating client config, merge with input config, etc.
 */
var ServerConfiguration = exports.ServerConfiguration = function (_Configuration) {
  _inherits(ServerConfiguration, _Configuration);

  function ServerConfiguration() {
    _classCallCheck(this, ServerConfiguration);

    return _possibleConstructorReturn(this, (ServerConfiguration.__proto__ || Object.getPrototypeOf(ServerConfiguration)).apply(this, arguments));
  }

  _createClass(ServerConfiguration, [{
    key: 'mergeWith',


    /**
     * Merge current config data with data from supplied configuration data object
     * Input config data overrides existing config state
     * @param {Object} configData
     */
    value: function mergeWith(configData) {
      if (!configData) {
        return;
      }

      this.config = (0, _lodash4.default)({}, this.config, configData);

      Object.freeze(this.config);
    }

    /**
     * Create client Configuration instance
     * Config data will be composed with listed props in `ServerConfiguration.clientPropsList` config key
     * @return {Configuration}
     */


    // key in config data object, which provides properties list, which should be exposed for client Configuration

  }, {
    key: 'getClientConfig',
    value: function getClientConfig() {
      var clientProps = void 0;

      try {
        clientProps = this.get(ServerConfiguration.clientPropsList);
      } catch (e) {
        throw new Error('[ServerConfiguration] "' + ServerConfiguration.clientPropsList + '" isn\'t defined in configuration');
      }

      return new _Configuration2.Configuration((0, _lodash2.default)(this.config, clientProps));
    }
  }]);

  return ServerConfiguration;
}(_Configuration2.Configuration);

ServerConfiguration.clientPropsList = 'CLIENT_PROPS';