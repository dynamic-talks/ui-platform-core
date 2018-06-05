import { createClientIoCContainer } from './client.ioc-container';


export const runClientApp = (mainModule) => {
  const iocContainer = createClientIoCContainer(window.__CONFIG__, window.__MANIFEST__);

  const app = iocContainer.resolve('app');

  app.addModule(mainModule);
  app.configure({ state: window.__STATE__ }).run();

  delete window.__CONFIG__;
  delete window.__STATE__;
  delete window.__MANIFEST__;
};
