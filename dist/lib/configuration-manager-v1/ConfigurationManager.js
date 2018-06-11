'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Encapsulate work with configuration data
 * Provides interface for getting nested config data via "dot notation" (e.g. "service.api.endpoint")
 */
var ConfigurationManager = exports.ConfigurationManager = function () {
  function ConfigurationManager(configurationData) {
    _classCallCheck(this, ConfigurationManager);

    this.config = configurationData;

    // freeze config data, since config data must be immutable during app lifecycle
    Object.freeze(this.config);
  }

  _createClass(ConfigurationManager, [{
    key: 'get',
    value: function get(dotNotation) {
      var dotTokens = dotNotation.split('.');

      try {
        return dotTokens.reduce(function (res, token) {
          return res[token];
        }, this.config);
      } catch (e) {
        throw new Error('ConfigurationManager: key ' + dotNotation + ' was not found in configuration');
      }
    }
  }]);

  return ConfigurationManager;
}();