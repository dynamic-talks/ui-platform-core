'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _get = require('lodash.get');

var ConfigurationManager = exports.ConfigurationManager = function () {
  function ConfigurationManager(config) {
    _classCallCheck(this, ConfigurationManager);

    this.config = config;
  }

  _createClass(ConfigurationManager, [{
    key: 'get',
    value: function get(dotNotation) {
      return _get(this.config, dotNotation, undefined);
    }
  }]);

  return ConfigurationManager;
}();

exports.default = ConfigurationManager;