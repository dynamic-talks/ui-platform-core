import { BaseTransport } from './BaseTransport';
import request from 'request';
//import { logData } from 'core/logging/logData';

export class NodeRequestTransport extends BaseTransport {

  request(config, meta) {
    const { context } = meta;

    //todo: let logData = this.createRequestLogData(config, context);

    //todo: this._logger.info('Preparing http request', logData);
    this._logger.info('Preparing http request');

    /**
     * mapping 'data' property, that we have in config object to body required by request library
     */
    if (config.data && config.method === 'POST') {
      config.body = JSON.stringify(config.data);

      delete config.data;
    }

    return new Promise((resolve, reject) => {
      this.stream(config, { ...meta, logData }, (error, response, body) => {
        if (error) {
          return reject(error);
        }

        if (body) {

          if (typeof(body) === 'string') {
            try {
              response.data = JSON.parse(body);
            } catch (error) {
              /*todo: this._logger.error(
                'Could not parse response body', logData.clone().errorMessage(error.message).httpBody(body)
              );*/

              this._logger.error('Could not parse response body', error.message, body);
            }
          }

          //this._logger.debug('Transport request response data', logData.extend({ body }));
          this._logger.debug('Transport request response data', body);
        }

        return resolve(response);
      });
    });
  }

  /**
   * Creates stream for http request
   *
   * @param {Object} config
   * @param {Object} meta
   * @param {Function} callback
   *
   * @returns {Stream} https://nodejs.org/api/stream.html#stream_readable_streams
   */
  stream(config, { context, logData }, callback = null) {
    //logData = logData || this.createRequestLogData(config, context);

    /**
     * request configuration accepts `qs` property as object of query params,
     * from config we have `params` property with same data, so mapping goes here
     */

    if (config.params) {
      config.qs = config.params;

      delete config.params;
    }

    //this._logger.info(`Request to ${config.url} started`, logData);
    this._logger.info(`Request to ${config.url} started`);
    //this._logger.debug(`${config.url} request headers`, logData.clone().httpHeaders(config.headers));
    this._logger.debug(`${config.url} request headers`, config.headers);

    return request(config, (error, response, body) => {
      if (error) {
        /*todo: this._logger.error(
          error.toString(), responseToLogData(logData.clone(), response, error)
        );*/
        this._logger.error(error.toString());

        return callback && callback(error, response);
      }

      //this._logger.debug(`${config.url} response headers`, logData.clone().httpHeaders(response.headers));
      this._logger.debug(`${config.url} response headers`, response.headers);

      return callback && callback(error, response, body);
    });
  }

  /**
   * Proxies http request to remote host and back to server response using streaming
   * request stream -> proxy stream -> response stream
   *
   * @param {http.ClientRequest} req
   * @param {http.ServerResponse} res
   * @param {String} destination
   * @param {Object} [settings]
   *
   * @returns {Stream} Proxy stream
   */
  pureProxy(req, res, destination, settings = {}) {
    let proxyStream = request(destination);
    let reqPipe = req.pipe(proxyStream);
    //let proxyLogData = logData().url(destination);

    proxyStream
      .on('error', (error) => {

        /*todo: this._logger.error(
          `Proxy to ${destination} failed!`,
          responseToLogData(proxyLogData.error(error), null, error)
        );*/

        this._logger.error(`Proxy to ${destination} failed!`,);

        const {retryTimeout } = settings;
        if (retryTimeout) {
          res.set('Retry-After', retryTimeout);
        }

        switch (error.code) {
          case 'ETIMEDOUT':
            res.status(504);
            break;
          default:
            res.status(503);
            break;
        }

        res.send(error);
      })
      .on('response', () => {
        reqPipe.pipe(res);
      });

    return proxyStream;
  }

  /*createRequestLogData(config, context, baseUrl = 'http://localhost') {
    return super.createRequestLogData(config, context, baseUrl);
  }*/
}



export default NodeRequestTransport;

export function responseToLogData(logData, response, error = null) {
  if (error) {
    logData.host(error.host).port(error.port);
  }

  if (response) {
    logData.httpStatus(response.statusCode);

    if (response.statusCode >= 400) {
      logData.httpBody(response.data || response.body);
    }
  }

  return logData;
}



export function createNodeRequestTransport(config, rootLogger) {
  return new NodeRequestTransport(config, rootLogger.getInterface('transport.node_request'));
}

createNodeRequestTransport.$inject = ['serverConfig', 'logger'];
createNodeRequestTransport.$singleton = true;
