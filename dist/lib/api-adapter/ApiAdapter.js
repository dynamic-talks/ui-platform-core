'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ApiAdapter = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.createApiAdapter = createApiAdapter;

var _Pipeline = require('./pipelines/Pipeline');

var _BaseTransport = require('./transports/BaseTransport');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//import { daoLogData } from './daoLogData';


/**
 * configuration signature
 * general idea to pass configure in way you want but map to transport layer
 * in request pipeline chain
 *
 * example axios config:
 * https://github.com/mzabriskie/axios#request-config
 */
var ApiAdapter = exports.ApiAdapter = function () {

  /**
   * Instantiation of ApiAdapter with transport instance
   *
   *
   * @param transport
   *
   * @param {Object} logger Logger bound to namespace
   *
   * @param requestPipeline Pipeline - Pipeline to process pure data passed to execute and return a object that suits transport requirements.
   * {reqData: {config, data}} will be passed as initial model to requestPipeline
   *
   * @param responsePipeline Pipeline - Pipeline to process response data comes from transport. Also it can implement more smart handlers such
   * as interceptors.
   * {
   * reqData: {config, data},
   * reqDataPiped: {}, // up to requestPipeline passed
   * resData: {}, // up to transport and response comes from server
   * transport: Transport // instance if transport
   * }
   * model will be passed to response pipeline
   */
  function ApiAdapter(transport, logger) {
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        requestPipeline = _ref.requestPipeline,
        responsePipeline = _ref.responsePipeline;

    _classCallCheck(this, ApiAdapter);

    if (transport === undefined) {
      throw new Error('BaseTransport should be provided');
    }

    if (!(transport instanceof _BaseTransport.BaseTransport)) {
      throw new Error('BaseTransport should be instance of BaseTransport');
    }

    this._transport = transport;
    this._logger = logger;

    this._requestPipeline = requestPipeline || new _Pipeline.Pipeline();
    this._responsePipeline = responsePipeline || new _Pipeline.Pipeline();

    if (!(this._requestPipeline instanceof _Pipeline.Pipeline)) {
      throw new Error('requestPipeline should be an instance of Pipeline');
    }

    if (!(this._responsePipeline instanceof _Pipeline.Pipeline)) {
      throw new Error('responsePipeline should be an instance of Pipeline');
    }
  }

  /**
   * Request using transport instance with processing of data through request and response Pipelines
   * @param config - general idea to pass configure in way you want but map to transport layer in request pipeline chain
   * @param data - valuable data to pass to server
   * @param {DaoRequestMeta|Null} [context]
   * @returns {Promise}
   */


  _createClass(ApiAdapter, [{
    key: 'request',
    value: function request(config) {
      var _this = this;

      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      //let requestLogData = daoLogData(config, context);

      var dataModel = {
        reqData: Object.assign({}, config, { data: data }),
        transport: this._transport,
        logger: this._logger,
        context: context
      };

      //this._logger.debug('ApiAdapter request started', requestLogData);
      this._logger.debug('ApiAdapter request started');

      /**
       * Request chain
       * apply request Pipeline
       *
       * do request
       *
       * ResponseChain
       * apply response Pipeline
       *
       * return Promise
       */

      return this._requestPipeline.execute(dataModel).then(function (_ref2) {
        var reqData = _ref2.reqData;

        /**
         * populate single data model to collect all states of data e.g. (before pipeline, after request)
         * to have possibility to work with them in response pipeline.
         */
        Object.assign(dataModel, { reqDataPiped: reqData });

        //todo: this._logger.debug('ApiAdapter requestPipeline finished', requestLogData.extend(dataModel.reqDataPiped));
        _this._logger.debug('ApiAdapter requestPipeline finished', dataModel.reqDataPiped);

        return _this._transport.request(dataModel.reqDataPiped, { context: dataModel.context });
      },
      //todo: err => this._handleError('requestPipeline', err, requestLogData)
      function (err) {
        return _this._handleError('requestPipeline', err);
      }).then(function (resData) {
        /**
         * populate single data model to collect all states of data e.g. (before pipeline, after request)
         * to have possibility to work with them in response pipeline.
         */
        Object.assign(dataModel, { resData: resData });

        return _this._responsePipeline.execute(dataModel);
      },
      //todo: err => this._handleError('transport', err, requestLogData)
      function (err) {
        return _this._handleError('transport', err);
      }).then(function (_ref3) {
        var resData = _ref3.resData;

        Object.assign(dataModel, { resDataPiped: resData });

        //todo: this._logger.debug('ApiAdapter request finished', requestLogData);
        _this._logger.debug('ApiAdapter request finished');

        return dataModel.resDataPiped;
      },
      //todo: err => this._handleError('responsePipeline', err, requestLogData)
      function (err) {
        return _this._handleError('responsePipeline', err);
      });
    }

    /**
     * we will not handle error here to provide ApiAdapter consumer possibility
     * to handle it with own behaviour
     * @param scope
     * @param err
     * @param {LogData} logData
     * @returns {Promise.<*>}
     * @private
     */

  }, {
    key: '_handleError',
    value: function _handleError(scope, err /*, logData*/) {
      //todo: this._logger.error(`ApiAdapter ${scope} Promise finished with error or rejection`, logData.clone().error(err));
      this._logger.error('ApiAdapter ' + scope + ' Promise finished with error or rejection', err);

      return Promise.reject(err);
    }
  }]);

  return ApiAdapter;
}();

function createApiAdapter(rootLogger, transport, pipelines) {
  return new ApiAdapter(transport, rootLogger.getInterface('ApiAdapter'), pipelines);
}

createApiAdapter.$inject = ['logger', 'httpTransport', 'pipelines'];
createApiAdapter.$singletion = true;