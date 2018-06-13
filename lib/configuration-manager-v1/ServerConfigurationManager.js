const pick = require('lodash.pick');
const { ConfigurationManager } = require('./ConfigurationManager');


export class ServerConfigurationManager extends ConfigurationManager {
  getClientConfig() {
    return pick(this.config, this.get('clientProps'));
  }
}



/**
 * ServerConfigurationManager creator
 * Specially for IoCContainer registration via factory function
 *
 * @param {BaseConfigurationReader} configReader
 * @returns {ServerConfigurationManager}
 */
export function serverConfigurationFactory(configReader) {
  return new ServerConfigurationManager(configReader.getConfigData());
}

serverConfigurationFactory.$inject    = ['configReader'];
serverConfigurationFactory.$singleton = true;
