'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configReaderFactory = configReaderFactory;

var _EnvFileConfigurationReader = require('./EnvFileConfigurationReader');

/**
 * Responsible to instantiate configuration reader according to supplied `type` argument
 * @param {String} type
 * @param {String} configReaderParams
 * @returns {BaseConfigurationReader}
 */
function configReaderFactory(type, configReaderParams) {

  switch (type) {
    case _EnvFileConfigurationReader.EnvFileConfigurationReader.readerType:
      return new _EnvFileConfigurationReader.EnvFileConfigurationReader(configReaderParams);

    default:
      throw new TypeError('configReaderFactory: Unrecognized reader type "' + type + '"');
  }
}

configReaderFactory.$singleton = true;
configReaderFactory.$inject = ['CONFIG_READER_TYPE', 'CONFIG_READER_PARAMS'];