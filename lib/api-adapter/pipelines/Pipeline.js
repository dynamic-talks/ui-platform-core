/**
 * Pipeline - simple implementation of 'Pipes and Filters' pattern to build pre- and post- processing handlers
 * chain for ApiAdapter. Idea is to fulfill ApiAdapterPipeline with handlers using .registerHandler method and process data
 * through chain of provided handlers using .execute method
 *
 * Handler provided to pipeline should be a function and return a promise,
 * implementing the following schema: (data) => Promise
 *
 * Pipeline, itself, after calling .execute method will return a Promise
 */
export default {a: 'v'};

export class Pipeline {
  constructor(handler) {
    this.handlers = [];

    if(typeof handler !== 'undefined') {
      this.registerHandler(handler);
    }
  }

  registerHandler(handler) {
    // checking handler type
    if (typeof handler !== 'function') {
      throw new Error('Unexpected handler was provided. Function are only acceptable values');
    }

    this.handlers.push(handler);

    return this;
  }


  /**
   * Execute method is a point where pipeline will go through handlers chain and pass data into each of them.
   * @param {Object, Promise} data   Inbound data or data provider (Promise) that pipeline will work with.
   * @returns {Promise}              pipeline will return promise as result
   */
  execute(data) {
    let _data = null;

    if (data instanceof Promise){
      _data = data;
    } else {
      _data = Promise.resolve(data);
    }


    return new Promise(resolve => {
      /**
       * If we want to brake pipeline execution we can call done as second handler parameter
       * and return it.
       */
      const breakPipelineExecution = (promise) => {
        resolve(promise);

        return 'BREAK';
      };

      this
        .handlers
        .reduce(
          (prevDataPromise, handler) => prevDataPromise
            .then(data => {
              if (data === 'BREAK') {
                /**
                 * it mean that handler broke pipeline execution
                 * we can skip executing of the handlers
                 * Parent promise already resolved from handler
                 */

                return 'BREAK';
              }

              return handler(data, breakPipelineExecution);
            }),
          _data
        )
        .then(data => {
          if (data === 'BREAK') {
            /**
             * it mean that handler broke pipeline execution
             * we can skip executing of the handlers
             * Parent promise already resolved from handler
             */

            return null;
          }

          return resolve(data);
        });
    });
  }
}
