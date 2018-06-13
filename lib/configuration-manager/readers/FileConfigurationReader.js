import path from 'path';
import fs from 'fs';
import yamljs from 'yamljs';
import { IConfigurationReader } from './IConfigurationReader';



export class FileConfigurationReader extends IConfigurationReader {

  static readerType = 'file';

  /**
   * Load config data from supplied config filename (without extension). File extension is gonna be evaluated
   * Supports 2 formats: YAML and JSON. YAML has precedence over JSON.
   * If file isn't found then return `null`
   *
   * @param configPath - configuration filename without extension
   * @returns {*}
   */
  static readConfigFile (configPath) {
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
   * Load "local" config file, which is intended for your local environment (your laptop, for example).
   * @param configDirPath - directory path, where config files should be placed
   * @returns {*}
   */
  readLocalConfigFileSync(configDirPath) {
    return FileConfigurationReader.readConfigFile(path.join(configDirPath, 'local'));
  }



  /**
   * Load default config file from supplied config directory path
   *
   * @param {String} configDirPath - directory path, where config files should be placed
   */
  readDefaultConfigFileSync(configDirPath) {
    const configData = FileConfigurationReader.readConfigFile(path.join(configDirPath, 'defaults'));

    if (! configData) {
      throw new Error(`FileConfigurationReader: default config file isn't found in "${configDirPath}"`);
    }

    return configData;
  }

  /**
   * Read config data from file, which is build on `--config-dir` cli arg + appName
   *
   * @param {String} appName
   * @param {Object} cliArgs
   * @return {Promise<Object>}
   */
  read({ appName, cliArgs }) {
    return new Promise((resolve, reject) => {
      const configDirPath = cliArgs['config-dir'];

      if (! configDirPath) {
        reject(new Error('[FileConfigurationReader] `--config-dir` cli argument isn\'t provided'));
      }

      try {
        const configData = FileConfigurationReader.readConfigFile(path.join(configDirPath, appName));

        resolve(configData);
      } catch (e) {
        reject(e);
      }
    });
  }
}
