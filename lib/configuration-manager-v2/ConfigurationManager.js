import path from 'path';
import parseArgs from 'minimist';
import { createReaderByType } from './readers';
import { ServerConfiguration } from './Configuration/ServerConfiguration';


/**
 * Responsive to handle configuration specific operation, organized between config reader and access object
 */
export class ConfigurationManager {

  static parseEnvVars() {
    return Object.assign({}, process.env);
  }



  static parseCliArgs() {
    return parseArgs(process.argv.slice(2));
  }


  constructor(rootDir) {
    this.rootDir = rootDir;
  }



  initialize({ readerType, appName }) {
    return new Promise((resolve, reject) => {
      const envVars = ConfigurationManager.parseEnvVars();
      const cliArgs = ConfigurationManager.parseCliArgs();

      // load default config
      const fileReader = createReaderByType('file');
      const config = new ServerConfiguration(fileReader.readDefaultConfigFileSync(path.join(this.rootDir, 'config')));

      // load specific config
      const reader = createReaderByType(readerType);

      return reader.read({ appName, envVars, cliArgs })
        .then(configData => {
          // merge default config with specific
          config.mergeWith(configData);

          // load "local" config file
          config.mergeWith(fileReader.readLocalConfigFileSync(path.join(this.rootDir, 'config')));

          resolve(config);
        })
        .catch(err => reject(err));
    });
  }
}
