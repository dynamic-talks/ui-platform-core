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
      // since below `reduce()` function won't throw an exception for 1st key
      // it's needed to be check specially
      if (dotTokens.length < 2 && ! this.config[dotTokens[0]]) {
        throw new Error();
      }

      return dotTokens.reduce(
        (res, token) => res[token],
        this.config
      );
    } catch (e) {
      throw new Error(`Configuration: key ${dotNotation} was not found in configuration`);
    }
  }
}
