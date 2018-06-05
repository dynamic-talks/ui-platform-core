'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createClientIoCContainer = createClientIoCContainer;

var _libioc = require('libioc');

var _ConfigurationManager = require('../configuration-manager/ConfigurationManager');

var _dummyLogger = require('../dummy-logger');

var _apiAdapter = require('../api-adapter');

var _AxiosTransport = require('../api-adapter/transports/AxiosTransport');

var _pipeline = require('../api-adapter/pipelines/server/pipeline.create');

var _client = require('./client.ui-application');

/**
 * Initial client IoC container with all bootstrap dependencies
 *
 * @param configData
 * @returns {IoCContainer}
 */
function createClientIoCContainer(configData) {
  var iocContainer = new _libioc.IoCContainer();

  iocContainer.registerAll({
    // some deps rely on IoC itself, so due to that we need to register IoC instance as well
    ioc: iocContainer,

    // logger, todo: should be replaced with real logger
    // e.g. https://github.com/GeorP/js-ntc-logger
    logger: (0, _libioc.iocClass)(_dummyLogger.DummyLogger).asSingleton(),

    // App configuration
    config: (0, _libioc.iocFactory)(function () {
      return new _ConfigurationManager.ConfigurationManager(configData);
    }).asSingleton(),

    // Api Adapter
    httpTransport: (0, _libioc.iocFactory)(_AxiosTransport.createAxiosTransport),
    pipelines: _pipeline.createServerPipeline,
    apiAdapter: (0, _libioc.iocFactory)(_apiAdapter.createApiAdapter),

    app: (0, _libioc.iocClass)(_client.ClientUiApplication)
  });

  return iocContainer;
}