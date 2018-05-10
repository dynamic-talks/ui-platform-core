import React from 'react';
import 'rxjs';
import { compose } from 'recompose';
import { IoCContainer } from 'libioc';
import { createStore } from '../redux/create-store';
import { withIoCProvider } from '../react-enhancers/withIoCProvider';
import { withReduxProvider } from '../react-enhancers/withReduxProvider';

export class UiApplication {
  constructor(ioc, config) {
    this._ioc = new IoCContainer({ parent: ioc });
    this._store = null;
    this._config = config;
    /**
     * @type {Module}
     * @private
     */
    this._modules = [];
    this._modulesMap = new Map();

    this._configured = false;
    this._running = false;
  }

  get store() {
    return this._store;
  }

  addModule(module) {
    if (this._configured) {
      throw new Error('Module couldn\'t be added to application because it already has been configured!');
    }

    if (!module || (typeof(module) !== 'object')) {
      throw new TypeError('Module should be an object!');
    }

    this._modules.push(module);
    this._modulesMap.set(module.name, module);

    // TODO: Provide right order of storing modules and dependencies
    if (module.dependsOn) {
      for (let dependency of module.dependsOn) {
        if (typeof(dependency) === 'string') {
          if (!this._modulesMap.has(dependency)) {
            throw new ReferenceError(
              `Module '${dependency}' which is required for module '${module.name}' is absent in application`
            );
          }
        } else {
          this.addModule(dependency);
        }
      }
    }

    return this;
  }

  configure({ state = {}, rawConfig = null } = {}) {
    if (this._configured) {
      throw new Error('UI application already configured!');
    }

    let reducers = {};
    let epics = [];

    for (let module of this._modules) {
      if (module.resources) {
        this._ioc.registerAll(module.resources);
      }

      if (module.reducers) {
        Object.assign(reducers, module.reducers);
      }

      if (module.epics) {
        epics.push.apply(epics, module.epics)
      }
    }

    if (Object.keys(reducers).length > 0) {
      this._store = createStore({ reducers, state, epics });
    }

    this._configured = true;

    for (let module of this._modules) {
      if (module.configure) {
        // TODO: redesign to use multiple Redux stores
        module.configure({ioc: this._ioc, store: this._store});
      }
    }

    return this;
  }

  /**
   * Render React app with Redux and IoC providers
   * @param Component
   * @returns {XML}
   */
  renderApp(Component) {
    const EnhancedComponent = compose(
      withIoCProvider(this._ioc),
      withReduxProvider(this._store),
    )(Component);

    return <EnhancedComponent/>;
  }

  run() {
    if (this._running) {
      throw new Error('UI application already running!');
    }

    if (!this._configured) {
      this.configure();
    }

    this._running = true;

    let renderedContent = this.render();

    let didMountPromises = [];

    for (let module of this._modules) {
      if (module.moduleDidMount) {
        didMountPromises.push(module.moduleDidMount({ioc: this._ioc, store: this._store}) || Promise.resolve(true));
      }
    }

    return Promise.all(didMountPromises).then(() => renderedContent)
  }

  render() {}
}
