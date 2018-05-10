const noop = () => null;

function createDummyLogger() {
  return {
    trace: noop,
    verbose: noop,
    debug: noop,
    info: noop,
    warn: noop,
    error:noop,
    critical:noop,

    getInterface: createDummyLogger,
  };
}


/**
 * Provides temporary dummy logger interface
 */
export class DummyLogger {

  getInterface() {
    return createDummyLogger();
  }
};
