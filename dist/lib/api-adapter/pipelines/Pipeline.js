'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
exports.default = { a: 'v' };

var Pipeline = exports.Pipeline = function () {
  function Pipeline(handler) {
    _classCallCheck(this, Pipeline);

    this.handlers = [];

    if (typeof handler !== 'undefined') {
      this.registerHandler(handler);
    }
  }

  _createClass(Pipeline, [{
    key: 'registerHandler',
    value: function registerHandler(handler) {
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

  }, {
    key: 'execute',
    value: function execute(data) {
      var _this = this;

      var _data = null;

      if (data instanceof Promise) {
        _data = data;
      } else {
        _data = Promise.resolve(data);
      }

      return new Promise(function (resolve) {
        /**
         * If we want to brake pipeline execution we can call done as second handler parameter
         * and return it.
         */
        var breakPipelineExecution = function breakPipelineExecution(promise) {
          resolve(promise);

          return 'BREAK';
        };

        _this.handlers.reduce(function (prevDataPromise, handler) {
          return prevDataPromise.then(function (data) {
            if (data === 'BREAK') {
              /**
               * it mean that handler broke pipeline execution
               * we can skip executing of the handlers
               * Parent promise already resolved from handler
               */

              return 'BREAK';
            }

            return handler(data, breakPipelineExecution);
          });
        }, _data).then(function (data) {
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
  }]);

  return Pipeline;
}();