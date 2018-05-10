import { Pipeline } from '../Pipeline';


/**
 * Create server pipeline payload
 * IoC dependency for `ApiAdapter`
 *
 * @returns {{requestPipeline: Pipeline, responsePipeline: Pipeline}}
 */
export function createServerPipeline() {
  // todo: add pipelines as soon as it's needed
  return {
    requestPipeline: new Pipeline,
    responsePipeline: new Pipeline,
  }
}

createServerPipeline.$singletion = true;
