import { IoCContainer, iocClass, iocFactory } from 'libioc';
import { ConfigurationReader } from '../configuration-manager/modules/ConfigurationReader';
import { createServerConfigurationManager } from '../configuration-manager/modules/ServerConfigurationManager';
import { DummyLogger } from '../dummy-logger';
import { createApiAdapter } from '../api-adapter';
import { createNodeRequestTransport } from '../api-adapter/transports/NodeRequestTransport';
import { createServerPipeline } from '../api-adapter/pipelines/server/pipeline.create';
import { ServerUiApplication } from './server.ui-application';



/**
 * Initial server IoC container with all bootstrap dependencies
 *
 * @param {String} baseConfigPath
 * @param {String} configPath
 * @returns {IoCContainer}
 */
export function createServerIocContainer({ baseConfigPath, configPath }) {
  const iocContainer = new IoCContainer;

  iocContainer.registerAll({
    // some deps rely on IoC itself, so due to that we need to register IoC instance as well
    ioc: iocContainer,

    // register config specific entities
    BASE_CONFIG_PATH: baseConfigPath,
    CONFIG_PATH: configPath,
    configReader: iocClass(ConfigurationReader),
    serverConfig: iocFactory(createServerConfigurationManager),

    // logger, todo: should be replaced with real logger
    // e.g. https://github.com/GeorP/js-ntc-logger
    logger: iocClass(DummyLogger).asSingleton(),

    // Api Adapter
    httpTransport: iocFactory(createNodeRequestTransport),
    pipelines: createServerPipeline,
    api: iocFactory(createApiAdapter),

    ServerUiApplication: iocClass(ServerUiApplication),
  });

  return iocContainer;
}
