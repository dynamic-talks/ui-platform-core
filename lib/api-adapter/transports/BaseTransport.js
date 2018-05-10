/**
 * Very basic wrapper for transport layer,
 * mostly defined to have future possibility to choose something else
 * or for mocking in testing flows.
 */
export class BaseTransport {
  constructor(config, logger) {
    this._config = config;
    this._logger = logger;
  }
  request() {
    throw new Error('BaseTransport interface, request method is not implemented');
  }

  /**
   * Creates new log data for request by passed config and context
   *
   * @protected
   *
   * @param {Object} config
   * @param {Object} context
   * @param {Object} [baseUrl] Base url which will be used for parsing urls without domain to the same host
   *
   * @returns {LogData}
   */
  /*createRequestLogData(config, context, baseUrl) {
    return transportLogData(config, context, baseUrl);
  }*/

  /**
   * Logs information about finished request to API with response info and level according to http response status code
   *
   * @protected
   *
   * @param {String} url
   * @param {LogData} logData - request log data which will be extended with response details
   * @param {Number} statusCode - HTTP response status code for choose appropriate log level
   */
  /*_logFinishResponse(url, logData, statusCode) {
    let logRecord = this._logger.l(`Request to ${url} finished`).data(logData);

    if (statusCode >= 100 && statusCode < 200) {
      logRecord.notice();
    } else if (statusCode >= 300 && statusCode < 400) {
      logRecord.warning();
    } else if (statusCode >= 400) {
      logRecord.error();
    } else {
      logRecord.info();
    }

    logRecord.log();
  }*/
}



export default BaseTransport;
