import { FileConfigurationReader } from './FileConfigurationReader';

const readersCollection = [
  FileConfigurationReader
];



export function createReaderByType(type) {
  const TargetReader = readersCollection.find(({ readerType }) => readerType === type);

  if (! TargetReader) {
    throw new TypeError(`ConfigurationManager: Unrecognized reader type "${type}"`);
  }

  return new TargetReader;
}
