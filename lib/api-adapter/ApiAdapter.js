import { Pipeline } from './pipelines/Pipeline';
import { BaseTransport } from './transports/BaseTransport';
//import { daoLogData } from './daoLogData';



/**
 * configuration signature
 * general idea to pass configure in way you want but map to transport layer
 * in request pipeline chain
 *
 * example axios config:
 * https://github.com/mzabriskie/axios#request-config
 */
export class ApiAdapter {


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
  constructor(transport, logger, {requestPipeline, responsePipeline} = {}) {
    if(transport === undefined) {
      throw new Error('BaseTransport should be provided');
    }

    if (!(transport instanceof BaseTransport)) {
      throw new Error('BaseTransport should be instance of BaseTransport');
    }

    this._transport = transport;
    this._logger = logger;

    this._requestPipeline = requestPipeline || new Pipeline;
    this._responsePipeline = responsePipeline || new Pipeline;

    if(!(this._requestPipeline instanceof Pipeline)) {
      throw new Error('requestPipeline should be an instance of Pipeline');
    }

    if(!(this._responsePipeline instanceof Pipeline)) {
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
  request (config, data={}, context = null) {
    //let requestLogData = daoLogData(config, context);

    const dataModel = {
      reqData: Object.assign({}, config, {data}),
      transport: this._transport,
      logger: this._logger,
      context
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

    return this
      ._requestPipeline
      .execute(dataModel)
      .then(
        ({reqData}) => {
          /**
           * populate single data model to collect all states of data e.g. (before pipeline, after request)
           * to have possibility to work with them in response pipeline.
           */
          Object.assign(dataModel, {reqDataPiped: reqData});

          //todo: this._logger.debug('ApiAdapter requestPipeline finished', requestLogData.extend(dataModel.reqDataPiped));
          this._logger.debug('ApiAdapter requestPipeline finished', dataModel.reqDataPiped);

          return this._transport.request(dataModel.reqDataPiped, { context: dataModel.context });
        },
        //todo: err => this._handleError('requestPipeline', err, requestLogData)
        err => this._handleError('requestPipeline', err)
      )
      .then(
        resData => {
          /**
           * populate single data model to collect all states of data e.g. (before pipeline, after request)
           * to have possibility to work with them in response pipeline.
           */
          Object.assign(dataModel, {resData});

          return this._responsePipeline.execute(dataModel);
        },
        //todo: err => this._handleError('transport', err, requestLogData)
        err => this._handleError('transport', err)
      )
      .then(
        ({resData}) => {
          Object.assign(dataModel, {resDataPiped: resData});

          //todo: this._logger.debug('ApiAdapter request finished', requestLogData);
          this._logger.debug('ApiAdapter request finished');

          return dataModel.resDataPiped;
        },
        //todo: err => this._handleError('responsePipeline', err, requestLogData)
        err => this._handleError('responsePipeline', err)
      );
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
  _handleError(scope, err/*, logData*/) {
    //todo: this._logger.error(`ApiAdapter ${scope} Promise finished with error or rejection`, logData.clone().error(err));
    this._logger.error(`ApiAdapter ${scope} Promise finished with error or rejection`, err);

    return Promise.reject(err);
  }
}



export function createApiAdapter(rootLogger, transport, pipelines) {
  return new ApiAdapter(transport, rootLogger.getInterface('ApiAdapter'), pipelines);
}

createApiAdapter.$inject     = ['logger', 'httpTransport', 'pipelines'];
createApiAdapter.$singletion = true;
