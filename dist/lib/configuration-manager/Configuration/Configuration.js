'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Provides interface for accessing configuration data
 * Nested object data can be obtain via "dot notation" (e.g. "service.api.endpoint")
 */
var Configuration = exports.Configuration = function () {
  function Configuration(configurationData) {
    _classCallCheck(this, Configuration);

    this.config = configurationData;

    // freeze config data, since config data must be immutable during app lifecycle
    Object.freeze(this.config);
  }

  _createClass(Configuration, [{
    key: 'get',
    value: function get(dotNotation) {
      if (!dotNotation) {
        return this.config;
      }

      var dotTokens = dotNotation.split('.');

      try {
        // since below `reduce()` function won't throw an exception for 1st key
        // it's needed to be check specially
        if (dotTokens.length < 2 && !this.config[dotTokens[0]]) {
          throw new Error();
        }

        return dotTokens.reduce(function (res, token) {
          return res[token];
        }, this.config);
      } catch (e) {
        throw new Error('Configuration: key ' + dotNotation + ' was not found in configuration');
      }
    }
  }]);

  return Configuration;
}();