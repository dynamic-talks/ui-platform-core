'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createServerIocContainer = createServerIocContainer;

var _libioc = require('libioc');

var _ConfigurationReader = require('../configuration-manager/modules/ConfigurationReader');

var _ServerConfigurationManager = require('../configuration-manager/modules/ServerConfigurationManager');

var _dummyLogger = require('../dummy-logger');

var _apiAdapter = require('../api-adapter');

var _NodeRequestTransport = require('../api-adapter/transports/NodeRequestTransport');

var _pipeline = require('../api-adapter/pipelines/server/pipeline.create');

var _server = require('./server.ui-application');

var _manifestManager = require('../manifestManager');

/**
 * Initial server IoC container with all bootstrap dependencies
 *
 * @param {String} baseConfigPath
 * @param {String} configPath
 * @returns {IoCContainer}
 */
function createServerIocContainer(_ref) {
  var baseConfigPath = _ref.baseConfigPath,
      configPath = _ref.configPath,
      manifestPath = _ref.manifestPath;

  var iocContainer = new _libioc.IoCContainer();

  iocContainer.registerAll({
    // some deps rely on IoC itself, so due to that we need to register IoC instance as well
    ioc: iocContainer,

    // register config specific entities
    BASE_CONFIG_PATH: baseConfigPath,
    CONFIG_PATH: configPath,
    MANIFEST_PATH: manifestPath,
    configReader: (0, _libioc.iocClass)(_ConfigurationReader.ConfigurationReader),
    manifestManager: (0, _libioc.iocClass)(_manifestManager.ManifestManager),
    config: (0, _libioc.iocFactory)(_ServerConfigurationManager.createServerConfigurationManager),

    // logger, todo: should be replaced with real logger
    // e.g. https://github.com/GeorP/js-ntc-logger
    logger: (0, _libioc.iocClass)(_dummyLogger.DummyLogger).asSingleton(),

    // Api Adapter
    httpTransport: (0, _libioc.iocFactory)(_NodeRequestTransport.createNodeRequestTransport),
    pipelines: _pipeline.createServerPipeline,
    apiAdapter: (0, _libioc.iocFactory)(_apiAdapter.createApiAdapter),

    ServerUiApplication: (0, _libioc.iocClass)(_server.ServerUiApplication)
  });

  return iocContainer;
}