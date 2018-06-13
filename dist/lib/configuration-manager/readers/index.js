'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createReaderByType = createReaderByType;

var _FileConfigurationReader = require('./FileConfigurationReader');

var readersCollection = [_FileConfigurationReader.FileConfigurationReader];

function createReaderByType(type) {
  var TargetReader = readersCollection.find(function (_ref) {
    var readerType = _ref.readerType;
    return readerType === type;
  });

  if (!TargetReader) {
    throw new TypeError('ConfigurationManager: Unrecognized reader type "' + type + '"');
  }

  return new TargetReader();
}