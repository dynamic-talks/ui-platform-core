const get = require('lodash.get');

export class ConfigurationManager {
  constructor(config) {
    this.config = config;
  }

  get(dotNotation) {
    return get(this.config, dotNotation, undefined);
  }
}



export default ConfigurationManager;
