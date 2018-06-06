/**
 * Provides interface for accessing configuration data
 * Nested object data can be obtain via "dot notation" (e.g. "service.api.endpoint")
 */
export class Configuration {
  constructor(configurationData) {
    this.config = configurationData;

    // freeze config data, since config data must be immutable during app lifecycle
    Object.freeze(this.config);
  }

  get(dotNotation) {
    if (! dotNotation) {
      return this.config;
    }

    const dotTokens = dotNotation.split('.');

    try {
      return dotTokens.reduce(
        (res, token) => res[token],
        this.config
      );
    } catch (e) {
      throw new Error(`ConfigurationManager: key ${dotNotation} was not found in configuration`);
    }
  }
}
