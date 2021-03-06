'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.createServerConfigurationManager = createServerConfigurationManager;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var pick = require('lodash.pick');

var _require = require('./ConfigurationManager'),
    ConfigurationManager = _require.ConfigurationManager;

var ServerConfigurationManager = exports.ServerConfigurationManager = function (_ConfigurationManager) {
  _inherits(ServerConfigurationManager, _ConfigurationManager);

  function ServerConfigurationManager() {
    _classCallCheck(this, ServerConfigurationManager);

    return _possibleConstructorReturn(this, (ServerConfigurationManager.__proto__ || Object.getPrototypeOf(ServerConfigurationManager)).apply(this, arguments));
  }

  _createClass(ServerConfigurationManager, [{
    key: 'getClientConfig',
    value: function getClientConfig() {
      return pick(this.config, this.get('clientProps'));
    }
  }]);

  return ServerConfigurationManager;
}(ConfigurationManager);

/**
 * ServerConfigurationManager creator
 * Specially for IoCContainer registration via factory function
 *
 * @param {ConfigurationReader} configReader
 * @returns {ServerConfigurationManager}
 */


function createServerConfigurationManager(configReader) {
  return new ServerConfigurationManager(configReader.getConfig());
}

createServerConfigurationManager.$inject = ['configReader'];
createServerConfigurationManager.$singleton = true;

exports.default = ServerConfigurationManager;