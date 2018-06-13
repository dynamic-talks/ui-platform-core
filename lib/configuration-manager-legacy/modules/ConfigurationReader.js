const yamljs = require('yamljs');
const path = require('path');
const pick = require('lodash.pick');
const merge = require('lodash.merge');
// TODO: should fine another cli parser, since it doesn't work right now
const cliArgs = require('cli-args');


/**
 * Encapsulates reading of configuration data from file, parsing it and apply cascading merging in next order
 * - config file
 * - env vars
 * - cli args
 * Currently YAML format supports only
 */
export class ConfigurationReader {

  static $inject = ['BASE_CONFIG_PATH', 'CONFIG_PATH'];
  static $singleton = true;

  constructor(baseConfigPath, configPath) {
    this.baseConfigPath = baseConfigPath;
    this.configPath  = configPath;

    this.initConfig();
  }

  initConfig() {
    let config        = this.convertFileContentToJSON(this.configPath);
    const baseConfig  = this.convertFileContentToJSON(this.baseConfigPath);
    const CLIArgs     = cliArgs(process.argv.slice(2));

    // apply cascading merging between base and concrete config data
    config = merge(baseConfig, config);

    this.configuration = merge(
      config,
      // pull out config data from CLI args
      pick(CLIArgs, Object.keys(config)),
      // pull out config data from env vars
      pick(process.env, Object.keys(config))
    );
  }

  convertFileContentToJSON(configPath) {
    if (path.extname(configPath).toLowerCase() === '.yaml') {
      return yamljs.load(configPath);
    }
    //Try to load as JSON
    return require(path.resolve(process.env.NODE_PATH, configPath));
  }

  getConfig() {
    return this.configuration;
  }
}



export default ConfigurationReader;
