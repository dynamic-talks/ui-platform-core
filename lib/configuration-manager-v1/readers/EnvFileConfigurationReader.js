import path from 'path';
import merge from 'lodash.merge';
import { BaseConfigurationReader } from './BaseConfigurationReader';



/**
 * Load configuration from file, which filename depends on env variable `NODE_ENV`
 * Also, provides support of "local" config, which has precedence over env config
 */

export class EnvFileConfigurationReader extends BaseConfigurationReader {

  static readerType = 'env-vars';

  static loadEnvConfigFile(configDirPath) {
    const configData = this.loadConfigFile(path.join(configDirPath, process.env.NODE_ENV));

    if (! configData) {
      throw new Error(`FileConfigurationReader: environment specific config file isn't found. Current env: "${process.env.NODE_ENV}"`);
    }

    return configData;
  }



  constructor({ configDirPath }) {
    super({ configDirPath });

    this.configData = merge(
      this.configData,
      EnvFileConfigurationReader.loadEnvConfigFile(configDirPath),
      EnvFileConfigurationReader.loadLocalConfigFile(configDirPath),
    );
  }
}
