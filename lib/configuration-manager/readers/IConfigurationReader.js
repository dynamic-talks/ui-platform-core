/**
 * Describe interface for concrete configuration reader classes
 */
export class IConfigurationReader {

  // Should be defined unique name in concrete class
  static readerType = null;

  /**
   * Implement concrete configuration reading. Since reading might be async logic it should return Promise instance
   *
   * @param {String} appName
   * @param {Object} envArgs
   * @param {Object} cliArgs
   * @return {Promise<Object>}
   */
  read() {
    throw new Error('[IConfigurationReader] read() ins\'t implemented');
  }
}
