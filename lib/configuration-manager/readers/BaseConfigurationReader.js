const yamljs = require('yamljs');
const path = require('path');
const fs = require('fs');


/**
 * Base configuration reader, intended to be used for inheritance by specific reader classes
 * Provides next features
 * - base interface
 * - set of of helper functions defined as static methods
 * - load default config from supplied config dir path
 */
export class BaseConfigurationReader {

  // the name of particular reader, which is used as type identifier in `configReaderFactory`
  static readerType = 'base';

  /**
   * Load config data from supplied config filename (without extension). File extension is gonna be evaluated
   * Supports 2 formats: YAML and JSON. YAML has precedence over JSON.
   * If file isn't found then return `null`
   *
   * @param configPath - configuration filename without extension
   * @returns {*}
   */
  static loadConfigFile (configPath) {
    const yamlConfigPath = `${configPath}.yaml`;
    const jsonConfigPath = `${configPath}.json`;

    if (fs.existsSync(yamlConfigPath)) {
      return yamljs.load(yamlConfigPath);
    } else if (fs.existsSync(jsonConfigPath)) {
      return require(jsonConfigPath);
    }

    return null;
  }



  /**
   * Load default config file from supplied config directory path
   *
   * @param {String} configDirPath - directory path, where config files should be placed
   */
  static loadDefaultConfigFile(configDirPath) {
    const configData = this.loadConfigFile(path.join(configDirPath, 'default'));

    if (! configData) {
      throw new Error(`BaseConfigurationReader: default config file isn't found in "${configDirPath}"`);
    }

    return configData;
  }

  /**
   * Load "local" config file, which is intended for your local environment (your laptop, for example).
   * @param configDirPath - directory path, where config files should be placed
   * @returns {*}
   */
  static loadLocalConfigFile(configDirPath) {
    return this.loadConfigFile(path.join(configDirPath, 'local'));
  }



  constructor({ configDirPath }) {
    this.configData = BaseConfigurationReader.loadDefaultConfigFile(configDirPath);
  }



  getConfigData() {
    return this.configData;
  }
}
