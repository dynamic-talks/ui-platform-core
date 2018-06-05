'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnvFileConfigurationReader = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

var _BaseConfigurationReader = require('./BaseConfigurationReader');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Load configuration from file, which filename depends on env variable `NODE_ENV`
 * Also, provides support of "local" config, which has precedence over env config
 */

var EnvFileConfigurationReader = exports.EnvFileConfigurationReader = function (_BaseConfigurationRea) {
  _inherits(EnvFileConfigurationReader, _BaseConfigurationRea);

  _createClass(EnvFileConfigurationReader, null, [{
    key: 'loadEnvConfigFile',
    value: function loadEnvConfigFile(configDirPath) {
      var configData = this.loadConfigFile(_path2.default.join(configDirPath, process.env.NODE_ENV));

      if (!configData) {
        throw new Error('FileConfigurationReader: environment specific config file isn\'t found. Current env: "' + process.env.NODE_ENV + '"');
      }

      return configData;
    }
  }]);

  function EnvFileConfigurationReader(_ref) {
    var configDirPath = _ref.configDirPath;

    _classCallCheck(this, EnvFileConfigurationReader);

    var _this = _possibleConstructorReturn(this, (EnvFileConfigurationReader.__proto__ || Object.getPrototypeOf(EnvFileConfigurationReader)).call(this, { configDirPath: configDirPath }));

    _this.configData = (0, _lodash2.default)(_this.configData, EnvFileConfigurationReader.loadEnvConfigFile(configDirPath), EnvFileConfigurationReader.loadLocalConfigFile(configDirPath));
    return _this;
  }

  return EnvFileConfigurationReader;
}(_BaseConfigurationReader.BaseConfigurationReader);

EnvFileConfigurationReader.readerType = 'env-vars';