import { IoCContainer, iocFactory, iocClass } from 'libioc';
import { ConfigurationManager } from 'platform-core/lib/configuration-manager/modules/ConfigurationManager';
import { DummyLogger } from '../dummy-logger';
import { createApiAdapter } from '../api-adapter';
import { createAxiosTransport } from '../api-adapter/transports/AxiosTransport';
import { createServerPipeline } from '../api-adapter/pipelines/server/pipeline.create';
import { ClientUiApplication } from './client.ui-application';


/**
 * Initial client IoC container with all bootstrap dependencies
 *
 * @param configData
 * @returns {IoCContainer}
 */
export function createClientIoCContainer(configData) {
  const iocContainer = new IoCContainer;

  iocContainer.registerAll({
    // some deps rely on IoC itself, so due to that we need to register IoC instance as well
    ioc: iocContainer,

    // logger, todo: should be replaced with real logger
    // e.g. https://github.com/GeorP/js-ntc-logger
    logger: iocClass(DummyLogger).asSingleton(),

    // App configuration
    config: iocFactory(() => new ConfigurationManager(configData)).asSingleton(),

    // Api Adapter
    httpTransport: iocFactory(createAxiosTransport),
    pipelines: createServerPipeline,
    api: iocFactory(createApiAdapter),

    app: iocClass(ClientUiApplication),
  });

  return iocContainer;
}
