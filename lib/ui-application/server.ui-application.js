import ReactDOMServer from 'react-dom/server';
import { UiApplication } from './ui-application';



export class ServerUiApplication extends UiApplication {

  getClientConfig() {
    return this._config.getClientConfig();
  }

  render() {
    let renderedModules = [];

    for (let module of this._modules) {
      if (module.render) {
        let { component, id } = module.render;

        renderedModules.push({
          id: id || 'root',
          html: ReactDOMServer.renderToString(this.renderApp(component))
        });
      }
    }

    return renderedModules;
  }
}
