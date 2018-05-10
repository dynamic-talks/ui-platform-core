import React from 'react';
import PropTypes from 'prop-types';
import { getDisplayName } from 'recompose';
import { IoCContainer } from 'libioc';



/**
 * Connect React component to TRU specific dependencies from the IoC container.
 * This connector function should be used along with `<ServiceProvider/>`.
 *
 * @param {Array} dependencies - list of dependencies which should be retrieved from the IoC container
 * @returns {Function}
 */
export function connectWithIoC(dependencies) {
  return (Component) => {
    const ConnectedWithIoC = (props, { iocContainer }) => {

      if (! iocContainer) {
        throw new Error('[connectWithIoC] "iocContainer" isn\'t found in context');
      }

      if (! Array.isArray(dependencies)) {
        throw new Error(`[connectWithIoC] Unrecognized 'dependencies' definition, it should be an array, but received: ${typeof dependencies}`);
      }

      const serviceSet = dependencies.reduce(
        (res, serviceName) => {
          const service = iocContainer.resolve(serviceName);

          if (typeof service === 'undefined') {
            throw new Error(`[connectWithIoC] Declared "${serviceName}" isn't found in IocContainer`);
          }

          res[serviceName] = service;

          return res;
        },
        {}
      );

      return (
        <Component
          {...props}
          {...serviceSet}
        />
      );
    };

    ConnectedWithIoC.displayName   = `ConnectedWithIoC(${getDisplayName(Component)})`;
    ConnectedWithIoC.contextTypes  = {
      iocContainer: PropTypes.instanceOf(IoCContainer).isRequired,
    };

    return ConnectedWithIoC;
  };
}
