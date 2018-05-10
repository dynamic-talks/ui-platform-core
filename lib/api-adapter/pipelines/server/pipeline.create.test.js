import { createServerPipeline } from './pipeline.create';

describe('pipeline create', () => {
  it('should be a funtion', () => {
    expect(typeof createServerPipeline).toBe('function');
  });

  it('Should be passed', () => {
    global.hello = 'world';
    expect(global.hello).not.toBeNull();
  });
});
