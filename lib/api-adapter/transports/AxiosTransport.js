import axios from 'axios';
import { BaseTransport } from './BaseTransport';

export class AxiosTransport extends BaseTransport {

  request(config, daoMeta) {
    let { context } = daoMeta;
    //let logData = this.createRequestLogData(config, context , window.location.origin);

    // TODO: recover commented code as soon as `logData` is implemented
    // this._logger.debug('ApiAdapter responsePipeline finished', logData.clone().httpBody(config.data), null, ['app_core', 'ApiAdapter', 'ajax']);
    this._logger.debug('ApiAdapter responsePipeline finished');

    const availableMethods = ['get', 'delete', 'head', 'post', 'put', 'patch'];

    if (!config.method) {
      throw new Error('AxiosTransport config should define `method` property');
    }

    const method = config.method.toLowerCase();

    if (availableMethods.indexOf(method) === -1) {
      throw new Error(`axiosTransport cannot handle ${method} method`);
    }

    if (!config.url) {
      throw new Error('AxiosTransport config should define `url` property');
    }

    config.headers = config.headers || {};

    // TODO: recover commented code as soon as `logData` is implemented
    // this._logger.debug(`Transport ${method} request started`, logData, null, ['app_core', 'ApiAdapter', 'transport', 'ajax']);
    this._logger.debug(`Transport ${method} request started`);

    return axios
      .create({
        timeout: this._config.get('api.transports.requestTimeout'),
        rejectUnauthorized: this._config.get('api.transports.rejectUnauthorized')
      })
      .request(config);

  }

  static factory(config, rootLogger) {
    return new AxiosTransport(config, rootLogger.getInterface('transport.axios'));
  }
}



export function createAxiosTransport(config, rootLogger) {
  return new AxiosTransport(config, rootLogger.getInterface('transport.axios'));
}

createAxiosTransport.$inject = ['config', 'logger'];
createAxiosTransport.$singletion = true;
