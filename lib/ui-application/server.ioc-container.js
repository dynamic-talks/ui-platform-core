import { IoCContainer, iocClass, iocFactory } from 'libioc';
import { DummyLogger } from '../dummy-logger';
import { createApiAdapter } from '../api-adapter';
import { createNodeRequestTransport } from '../api-adapter/transports/NodeRequestTransport';
import { createServerPipeline } from '../api-adapter/pipelines/server/pipeline.create';
import { ServerUiApplication } from './server.ui-application';
import { AssetsManifestManager } from '../assets-manifest-manager';



/**
 * Initial server IoC container with all bootstrap dependencies
 *
 * @param {ServerConfiguration} config
 * @param {Object} assetsManifestPath
 * @returns {IoCContainer}
 */
export function createServerIocContainer({ config, assetsManifestPath }) {
  const iocContainer = new IoCContainer;

  iocContainer.registerAll({
    // some deps rely on IoC itself, so due to that we need to register IoC instance as well
    ioc: iocContainer,

    // register config
    config,

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
