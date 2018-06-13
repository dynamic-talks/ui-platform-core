import { EnvFileConfigurationReader } from './EnvFileConfigurationReader';



/**
 * Responsible to instantiate configuration reader according to supplied `type` argument
 * @param {String} type
 * @param {String} configReaderParams
 * @returns {BaseConfigurationReader}
 */
export function configReaderFactory(type, configReaderParams) {

  switch (type) {
    case EnvFileConfigurationReader.readerType:
      return new EnvFileConfigurationReader(configReaderParams);

    default:
      throw new TypeError(`configReaderFactory: Unrecognized reader type "${type}"`);
  }
}


configReaderFactory.$singleton = true;
configReaderFactory.$inject = ['CONFIG_READER_TYPE', 'CONFIG_READER_PARAMS'];
