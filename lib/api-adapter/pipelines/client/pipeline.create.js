import { Pipeline } from '../Pipeline';


/**
 * Create client pipeline payload
 * IoC dependency for `ApiAdapter`
 *
 * @returns {{requestPipeline: Pipeline, responsePipeline: Pipeline}}
 */
export function createClientPipeline() {
  // todo: add pipelines as soon as it's needed
  return {
    requestPipeline: new Pipeline,
    responsePipeline: new Pipeline,
  }
}

createClientPipeline.$singleton = true;
