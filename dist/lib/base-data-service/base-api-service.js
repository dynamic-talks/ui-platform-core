'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseApiService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _apiAdapter = require('../api-adapter');

var _ConfigurationManager = require('../configuration-manager/ConfigurationManager');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Provides collection of methods, which are responsible for
 * data loading (API call) with ApiAdapter on particular endpoint.
 */
var BaseApiService = exports.BaseApiService = function () {
  _createClass(BaseApiService, null, [{
    key: 'factory',
    value: function factory(apiAdapter, config, logger) {
      return new this(apiAdapter, config, logger.getInterface('api-service'));
    }

    /**
     * @param  {ApiAdapter} apiAdapter - encapsualtes request making
     * @param  {ConfigurationManager} config - instance of Configuration manager
     * @param  {Object} logger - app logger
     */

  }]);

  function BaseApiService(apiAdapter, config, logger) {
    _classCallCheck(this, BaseApiService);

    if (!(apiAdapter instanceof _apiAdapter.ApiAdapter)) {
      throw new TypeError('[BaseApiService] Unrecognized `apiAdapter` argument, it must be the instance of `ApiAdapter`');
    }

    if (!(config instanceof _ConfigurationManager.ConfigurationManager)) {
      throw new TypeError('[BaseApiService] Unrecognized `config` argument, it must be the instance of `ConfigurationManager`');
    }

    this.apiAdapter = apiAdapter;
    this.config = config;
    this.logger = logger;
  }

  /**
   * Provides ability to make direct HTTP request
   *
   * @param  {Object} params request specific parameters
   * @param  {Object} data   request data (Specially for POST)
   * @return {Promise}
   */


  _createClass(BaseApiService, [{
    key: 'request',
    value: function request(params, data) {
      return this.apiAdapter.request(params, data);
    }
  }]);

  return BaseApiService;
}();