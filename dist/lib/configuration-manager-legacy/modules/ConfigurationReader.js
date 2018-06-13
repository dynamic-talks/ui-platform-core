'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var yamljs = require('yamljs');
var path = require('path');
var pick = require('lodash.pick');
var merge = require('lodash.merge');
// TODO: should fine another cli parser, since it doesn't work right now
var cliArgs = require('cli-args');

/**
 * Encapsulates reading of configuration data from file, parsing it and apply cascading merging in next order
 * - config file
 * - env vars
 * - cli args
 * Currently YAML format supports only
 */

var ConfigurationReader = exports.ConfigurationReader = function () {
  function ConfigurationReader(baseConfigPath, configPath) {
    _classCallCheck(this, ConfigurationReader);

    this.baseConfigPath = baseConfigPath;
    this.configPath = configPath;

    this.initConfig();
  }

  _createClass(ConfigurationReader, [{
    key: 'initConfig',
    value: function initConfig() {
      var config = this.convertFileContentToJSON(this.configPath);
      var baseConfig = this.convertFileContentToJSON(this.baseConfigPath);
      var CLIArgs = cliArgs(process.argv.slice(2));

      // apply cascading merging between base and concrete config data
      config = merge(baseConfig, config);

      this.configuration = merge(config,
      // pull out config data from CLI args
      pick(CLIArgs, Object.keys(config)),
      // pull out config data from env vars
      pick(process.env, Object.keys(config)));
    }
  }, {
    key: 'convertFileContentToJSON',
    value: function convertFileContentToJSON(configPath) {
      if (path.extname(configPath).toLowerCase() === '.yaml') {
        return yamljs.load(configPath);
      }
      //Try to load as JSON
      return require(path.resolve(process.env.NODE_PATH, configPath));
    }
  }, {
    key: 'getConfig',
    value: function getConfig() {
      return this.configuration;
    }
  }]);

  return ConfigurationReader;
}();

ConfigurationReader.$inject = ['BASE_CONFIG_PATH', 'CONFIG_PATH'];
ConfigurationReader.$singleton = true;
exports.default = ConfigurationReader;