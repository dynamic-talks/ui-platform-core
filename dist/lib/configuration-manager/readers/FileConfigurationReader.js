'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FileConfigurationReader = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _yamljs = require('yamljs');

var _yamljs2 = _interopRequireDefault(_yamljs);

var _IConfigurationReader2 = require('./IConfigurationReader');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FileConfigurationReader = exports.FileConfigurationReader = function (_IConfigurationReader) {
  _inherits(FileConfigurationReader, _IConfigurationReader);

  function FileConfigurationReader() {
    _classCallCheck(this, FileConfigurationReader);

    return _possibleConstructorReturn(this, (FileConfigurationReader.__proto__ || Object.getPrototypeOf(FileConfigurationReader)).apply(this, arguments));
  }

  _createClass(FileConfigurationReader, [{
    key: 'readLocalConfigFileSync',


    /**
     * Load "local" config file, which is intended for your local environment (your laptop, for example).
     * @param configDirPath - directory path, where config files should be placed
     * @returns {*}
     */
    value: function readLocalConfigFileSync(configDirPath) {
      return FileConfigurationReader.readConfigFile(_path2.default.join(configDirPath, 'local'));
    }

    /**
     * Load default config file from supplied config directory path
     *
     * @param {String} configDirPath - directory path, where config files should be placed
     */

  }, {
    key: 'readDefaultConfigFileSync',
    value: function readDefaultConfigFileSync(configDirPath) {
      var configData = FileConfigurationReader.readConfigFile(_path2.default.join(configDirPath, 'defaults'));

      if (!configData) {
        throw new Error('FileConfigurationReader: default config file isn\'t found in "' + configDirPath + '"');
      }

      return configData;
    }

    /**
     * Read config data from file, which is build on `--config-dir` cli arg + appName
     *
     * @param {String} appName
     * @param {Object} cliArgs
     * @return {Promise<Object>}
     */

  }, {
    key: 'read',
    value: function read(_ref) {
      var appName = _ref.appName,
          cliArgs = _ref.cliArgs;

      return new Promise(function (resolve, reject) {
        var configDirPath = cliArgs['config-dir'];

        if (!configDirPath) {
          reject(new Error('[FileConfigurationReader] `--config-dir` cli argument isn\'t provided'));
        }

        try {
          var configData = FileConfigurationReader.readConfigFile(_path2.default.join(configDirPath, appName));

          resolve(configData);
        } catch (e) {
          reject(e);
        }
      });
    }
  }], [{
    key: 'readConfigFile',


    /**
     * Load config data from supplied config filename (without extension). File extension is gonna be evaluated
     * Supports 2 formats: YAML and JSON. YAML has precedence over JSON.
     * If file isn't found then return `null`
     *
     * @param configPath - configuration filename without extension
     * @returns {*}
     */
    value: function readConfigFile(configPath) {
      var yamlConfigPath = configPath + '.yaml';
      var jsonConfigPath = configPath + '.json';

      if (_fs2.default.existsSync(yamlConfigPath)) {
        return _yamljs2.default.load(yamlConfigPath);
      } else if (_fs2.default.existsSync(jsonConfigPath)) {
        return require(jsonConfigPath);
      }

      return null;
    }
  }]);

  return FileConfigurationReader;
}(_IConfigurationReader2.IConfigurationReader);

FileConfigurationReader.readerType = 'file';