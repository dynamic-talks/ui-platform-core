/**
 * Encapsulate work with configuration data
 * Provides interface for getting nested config data via "dot notation" (e.g. "service.api.endpoint")
 */
export class ConfigurationManager {
  constructor(configurationData) {
    this.config = configurationData;

    // freeze config data, since config data must be immutable during app lifecycle
    Object.freeze(this.config);
  }

  get(dotNotation) {
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
