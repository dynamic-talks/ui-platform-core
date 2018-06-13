'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var yamljs = require('yamljs');
var path = require('path');
var fs = require('fs');

/**
 * Base configuration reader, intended to be used for inheritance by specific reader classes
 * Provides next features
 * - base interface
 * - set of of helper functions defined as static methods
 * - load default config from supplied config dir path
 */

var BaseConfigurationReader = exports.BaseConfigurationReader = function () {
  _createClass(BaseConfigurationReader, null, [{
    key: 'loadConfigFile',


    /**
     * Load config data from supplied config filename (without extension). File extension is gonna be evaluated
     * Supports 2 formats: YAML and JSON. YAML has precedence over JSON.
     * If file isn't found then return `null`
     *
     * @param configPath - configuration filename without extension
     * @returns {*}
     */
    value: function loadConfigFile(configPath) {
      var yamlConfigPath = configPath + '.yaml';
      var jsonConfigPath = configPath + '.json';

      if (fs.existsSync(yamlConfigPath)) {
        return yamljs.load(yamlConfigPath);
      } else if (fs.existsSync(jsonConfigPath)) {
        return require(jsonConfigPath);
      }

      return null;
    }

    /**
     * Load default config file from supplied config directory path
     *
     * @param {String} configDirPath - directory path, where config files should be placed
     */


    // the name of particular reader, which is used as type identifier in `configReaderFactory`

  }, {
    key: 'loadDefaultConfigFile',
    value: function loadDefaultConfigFile(configDirPath) {
      var configData = this.loadConfigFile(path.join(configDirPath, 'default'));

      if (!configData) {
        throw new Error('BaseConfigurationReader: default config file isn\'t found in "' + configDirPath + '"');
      }

      return configData;
    }

    /**
     * Load "local" config file, which is intended for your local environment (your laptop, for example).
     * @param configDirPath - directory path, where config files should be placed
     * @returns {*}
     */

  }, {
    key: 'loadLocalConfigFile',
    value: function loadLocalConfigFile(configDirPath) {
      return this.loadConfigFile(path.join(configDirPath, 'local'));
    }
  }]);

  function BaseConfigurationReader(_ref) {
    var configDirPath = _ref.configDirPath;

    _classCallCheck(this, BaseConfigurationReader);

    this.configData = BaseConfigurationReader.loadDefaultConfigFile(configDirPath);
  }

  _createClass(BaseConfigurationReader, [{
    key: 'getConfigData',
    value: function getConfigData() {
      return this.configData;
    }
  }]);

  return BaseConfigurationReader;
}();

BaseConfigurationReader.readerType = 'base';