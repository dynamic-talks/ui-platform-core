import { ApiAdapter } from 'lib/api-adapter';
import { ConfigurationManager } from 'lib/configuration-manager/modules/ConfigurationManager';



/**
 * Provides collection of methods, which are responsible for
 * data loading (API call) with ApiAdapter on particular endpoint.
 */
export class BaseApiService {

  static factory(apiAdapter, config, logger) {
    return new this(apiAdapter, config, logger.getInterface('api-service'));
  }

  /**
   * @param  {ApiAdapter} apiAdapter - encapsualtes request making
   * @param  {ConfigurationManager} config - instance of Configuration manager
   * @param  {Object} logger - app logger
   */
  constructor(apiAdapter, config, logger) {
    /*if (! (apiAdapter instanceof ApiAdapter)) {
      throw new TypeError('[BaseApiService] Unrecognized `apiAdapter` argument, it must be the instance of `ApiAdapter`');
    }

    if (! (config instanceof ConfigurationManager)) {
      throw new TypeError('[BaseApiService] Unrecognized `config` argument, it must be the instance of `ConfigurationManager`');
    }*/

    this.apiAdapter = apiAdapter;
    this.config     = config;
    this.logger     = logger;
  }


  /**
   * Provides ability to make direct HTTP request
   *
   * @param  {Object} params request specific parameters
   * @param  {Object} data   request data (Specially for POST)
   * @return {Promise}
   */
  request(params, data) {
    return this.apiAdapter.request(params, data);
  }
}
