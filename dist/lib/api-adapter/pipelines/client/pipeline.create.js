'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createClientPipeline = createClientPipeline;

var _Pipeline = require('../Pipeline');

/**
 * Create client pipeline payload
 * IoC dependency for `ApiAdapter`
 *
 * @returns {{requestPipeline: Pipeline, responsePipeline: Pipeline}}
 */
function createClientPipeline() {
  // todo: add pipelines as soon as it's needed
  return {
    requestPipeline: new _Pipeline.Pipeline(),
    responsePipeline: new _Pipeline.Pipeline()
  };
}

createClientPipeline.$singleton = true;