import pick from 'lodash.pick';
import merge from 'lodash.merge';
import { Configuration } from './Configuration';



/**
 * Extends `Configuration` class with server specific functionality like creating client config, merge with input config, etc.
 */
export class ServerConfiguration extends Configuration {

  // key in config data object, which provides properties list, which should be exposed for client Configuration
  static clientPropsList = 'CLIENT_PROPS';



  /**
   * Merge current config data with data from supplied configuration data object
   * @param {Object} configData
   */
  mergeWith(configData) {
    if (! configData) {
      return;
    }

    this.config = merge(this.config, configData);

    Object.freeze(this.config);
  }



  /**
   * Create client Configuration instance
   * Config data will be composed with listed props in `ServerConfiguration.clientPropsList` config key
   * @return {Configuration}
   */
  getClientConfig() {
    let clientProps;

    try {
      clientProps = this.get(ServerConfiguration.clientPropsList);
    } catch (e) {
      throw new Error(`[ServerConfiguration] "${ServerConfiguration.clientPropsList}" isn't defined in configuration`);
    }

    return new Configuration(pick(this.config, clientProps));
  }
}
