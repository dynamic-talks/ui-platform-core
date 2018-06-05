'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createServerIocContainer = createServerIocContainer;

var _libioc = require('libioc');

var _readers = require('../configuration-manager/readers');

var _ServerConfigurationManager = require('../configuration-manager/ServerConfigurationManager');

var _dummyLogger = require('../dummy-logger');

var _apiAdapter = require('../api-adapter');

var _NodeRequestTransport = require('../api-adapter/transports/NodeRequestTransport');

var _pipeline = require('../api-adapter/pipelines/server/pipeline.create');

var _server = require('./server.ui-application');

var _assetsManifestManager = require('../assets-manifest-manager');

/**
 * Initial server IoC container with all bootstrap dependencies
 *
 * @param {String} configReaderType - type of concrete config reader
 * @param {Object} configReaderParams - params intended to be passed to concrete config reader constructor
 * @param {Object} assetsManifestPath
 * @returns {IoCContainer}
 */
function createServerIocContainer(_ref) {
  var configReaderType = _ref.configReaderType,
      configReaderParams = _ref.configReaderParams,
      assetsManifestPath = _ref.assetsManifestPath;

  var iocContainer = new _libioc.IoCContainer();

  iocContainer.registerAll({
    // some deps rely on IoC itself, so due to that we need to register IoC instance as well
    ioc: iocContainer,

    // register config specific entities
    CONFIG_READER_TYPE: configReaderType,
    CONFIG_READER_PARAMS: configReaderParams,
    configReader: (0, _libioc.iocFactory)(_readers.configReaderFactory),
    config: (0, _libioc.iocFactory)(_ServerConfigurationManager.serverConfigurationFactory),

    // manifest specific entities
    MANIFEST_PATH: assetsManifestPath,
    manifestManager: (0, _libioc.iocClass)(_assetsManifestManager.AssetsManifestManager),

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