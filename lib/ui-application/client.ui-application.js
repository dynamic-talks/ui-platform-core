import React from 'react';
import ReactDOM from 'react-dom';
import { UiApplication } from './ui-application';

export class ClientUiApplication extends UiApplication {

  static $inject     = ['ioc', 'config'];
  static $singletion = true;



  render() {
    let renderedModules = [];

    for (let module of this._modules) {
      if (module.render) {
        const { component, id } = module.render;

        renderedModules.push(
          ReactDOM.hydrate(this.renderApp(component), document.getElementById(id || 'root'))
        );
      }
    }

    return renderedModules;
  }
}
