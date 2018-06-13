'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createServerIocContainer = createServerIocContainer;

var _libioc = require('libioc');

var _dummyLogger = require('../dummy-logger');

var _apiAdapter = require('../api-adapter');

var _NodeRequestTransport = require('../api-adapter/transports/NodeRequestTransport');

var _pipeline = require('../api-adapter/pipelines/server/pipeline.create');

var _server = require('./server.ui-application');

var _assetsManifestManager = require('../assets-manifest-manager');

/**
 * Initial server IoC container with all bootstrap dependencies
 *
 * @param {ServerConfiguration} config
 * @param {Object} assetsManifestPath
 * @returns {IoCContainer}
 */
function createServerIocContainer(_ref) {
  var config = _ref.config,
      assetsManifestPath = _ref.assetsManifestPath;

  var iocContainer = new _libioc.IoCContainer();

  iocContainer.registerAll({
    // some deps rely on IoC itself, so due to that we need to register IoC instance as well
    ioc: iocContainer,

    // register config
    config: config,

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