'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createServerPipeline = createServerPipeline;

var _Pipeline = require('../Pipeline');

/**
 * Create server pipeline payload
 * IoC dependency for `ApiAdapter`
 *
 * @returns {{requestPipeline: Pipeline, responsePipeline: Pipeline}}
 */
function createServerPipeline() {
  // todo: add pipelines as soon as it's needed
  return {
    requestPipeline: new _Pipeline.Pipeline(),
    responsePipeline: new _Pipeline.Pipeline()
  };
}

createServerPipeline.$singletion = true;