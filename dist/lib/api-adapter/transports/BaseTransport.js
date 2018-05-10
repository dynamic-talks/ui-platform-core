'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Very basic wrapper for transport layer,
 * mostly defined to have future possibility to choose something else
 * or for mocking in testing flows.
 */
var BaseTransport = exports.BaseTransport = function () {
  function BaseTransport(config, logger) {
    _classCallCheck(this, BaseTransport);

    this._config = config;
    this._logger = logger;
  }

  _createClass(BaseTransport, [{
    key: 'request',
    value: function request() {
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

  }]);

  return BaseTransport;
}();

exports.default = BaseTransport;