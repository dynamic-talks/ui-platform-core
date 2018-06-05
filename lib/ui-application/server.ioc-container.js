import { IoCContainer, iocClass, iocFactory } from 'libioc';
import { configReaderFactory } from 'lib/configuration-manager/readers';
import { serverConfigurationFactory } from 'lib/configuration-manager/ServerConfigurationManager';
import { DummyLogger } from '../dummy-logger';
import { createApiAdapter } from '../api-adapter';
import { createNodeRequestTransport } from '../api-adapter/transports/NodeRequestTransport';
import { createServerPipeline } from '../api-adapter/pipelines/server/pipeline.create';
import { ServerUiApplication } from './server.ui-application';
import { AssetsManifestManager } from '../assets-manifest-manager';



/**
 * Initial server IoC container with all bootstrap dependencies
 *
 * @param {String} configReaderType - type of concrete config reader
 * @param {Object} configReaderParams - params intended to be passed to concrete config reader constructor
 * @param {Object} assetsManifestPath
 * @returns {IoCContainer}
 */
export function createServerIocContainer({ configReaderType, configReaderParams, assetsManifestPath }) {
  const iocContainer = new IoCContainer;

  iocContainer.registerAll({
    // some deps rely on IoC itself, so due to that we need to register IoC instance as well
    ioc: iocContainer,

    // register config specific entities
    CONFIG_READER_TYPE: configReaderType,
    CONFIG_READER_PARAMS: configReaderParams,
    configReader: iocFactory(configReaderFactory),
    config: iocFactory(serverConfigurationFactory),

    // manifest specific entities
    MANIFEST_PATH: assetsManifestPath,
    manifestManager: iocClass(AssetsManifestManager),

    // logger, todo: should be replaced with real logger
    // e.g. https://github.com/GeorP/js-ntc-logger
    logger: iocClass(DummyLogger).asSingleton(),

    // Api Adapter
    httpTransport: iocFactory(createNodeRequestTransport),
    pipelines: createServerPipeline,
    apiAdapter: iocFactory(createApiAdapter),


    ServerUiApplication: iocClass(ServerUiApplication),
  });

  return iocContainer;
}
