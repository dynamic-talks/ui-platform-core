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
 * @param {ConfigurationReader} configReader
 * @returns {ServerConfigurationManager}
 */
export function createServerConfigurationManager(configReader) {
  return new ServerConfigurationManager(configReader.getConfig());
}

createServerConfigurationManager.$inject    = ['configReader'];
createServerConfigurationManager.$singleton = true;



export default ServerConfigurationManager;
