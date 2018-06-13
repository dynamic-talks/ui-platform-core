'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigurationManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _readers = require('./readers');

var _ServerConfiguration = require('./Configuration/ServerConfiguration');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Responsive to handle configuration specific operation, organized between config reader and access object
 */
var ConfigurationManager = exports.ConfigurationManager = function () {
  _createClass(ConfigurationManager, null, [{
    key: 'parseEnvVars',
    value: function parseEnvVars() {
      return Object.assign({}, process.env);
    }
  }, {
    key: 'parseCliArgs',
    value: function parseCliArgs() {
      return (0, _minimist2.default)(process.argv.slice(2));
    }
  }]);

  function ConfigurationManager(rootDir) {
    _classCallCheck(this, ConfigurationManager);

    this.rootDir = rootDir;
  }

  _createClass(ConfigurationManager, [{
    key: 'initialize',
    value: function initialize(_ref) {
      var _this = this;

      var readerType = _ref.readerType,
          appName = _ref.appName;

      return new Promise(function (resolve, reject) {
        var envVars = ConfigurationManager.parseEnvVars();
        var cliArgs = ConfigurationManager.parseCliArgs();

        // load default config
        var fileReader = (0, _readers.createReaderByType)('file');
        var config = new _ServerConfiguration.ServerConfiguration(fileReader.readDefaultConfigFileSync(_path2.default.join(_this.rootDir, 'config')));

        // load specific config
        var reader = (0, _readers.createReaderByType)(readerType);

        return reader.read({ appName: appName, envVars: envVars, cliArgs: cliArgs }).then(function (configData) {
          // merge default config with specific
          config.mergeWith(configData);

          // load "local" config file
          config.mergeWith(fileReader.readLocalConfigFileSync(_path2.default.join(_this.rootDir, 'config')));

          resolve(config);
        }).catch(function (err) {
          return reject(err);
        });
      });
    }
  }]);

  return ConfigurationManager;
}();