'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseDataService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _libioc = require('libioc');

var _baseApiService = require('./base-api-service');

var _ConfigurationManager = require('../configuration-manager/ConfigurationManager');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Provides High-level API for domain specific data
 * Owns data validation, pre/post-processing of request/response data
 */
var BaseDataService = exports.BaseDataService = function () {
  _createClass(BaseDataService, null, [{
    key: 'createFactory',


    /**
     * Generate factory function for concrete Data Service with supplied Api Service
     * Output factory is intended for IoC container
     *
     * @param  {BaseApiService} ApiService
     * @param  {Boolean} [isSingleton]
     * @return {Function}
     */
    value: function createFactory(ApiService) {
      var _this = this;

      var isSingleton = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      var factory = function factory(apiAdapter, config, logger) {
        return new _this(ApiService.factory(apiAdapter, config, logger), config, logger);
      };

      factory.$inject = ['apiAdapter', 'config', 'logger'];
      factory.$singleton = isSingleton;

      return (0, _libioc.iocFactory)(factory);
    }

    /**
     * @param  {BaseApiService} apiService
     * @param  {ConfigurationManager} config
     * @param  {Object} logger
     */

  }]);

  function BaseDataService(apiService, config, logger) {
    _classCallCheck(this, BaseDataService);

    if (!(apiService instanceof _baseApiService.BaseApiService)) {
      throw new TypeError('[BaseDataService] Unrecognized `apiService` argument, it must be the instance of `BaseApiService`');
    }

    if (!(config instanceof _ConfigurationManager.ConfigurationManager)) {
      throw new TypeError('[BaseDataService] Unrecognized `config` argument, it must be the instance of `ConfigurationManager`');
    }

    this.api = apiService;
    this.config = config;
    this.logger = logger;
  }

  return BaseDataService;
}();