import { ServerConfiguration } from './ServerConfiguration';
import pick from 'lodash.pick';


describe('ServerConfiguration', function () {

  // define mock config data
  const mockConfigData = {
    appName : 'test-app',

    api: {
      endpoint: 'http://test.com',
      timeout: 5000,
    },

    session: {
      id: 'sessionid',
      expired: 3000,
    },

    user: {
      roles: ['admin', 'guest'],
      nickname: 'testuser',
      demographic: {
        age: 27,
        gender: 'man'
      }
    },

    [ServerConfiguration.clientPropsList]: ['user', 'api'],
  };


  it('ServerConfiguration is instantiated with expected and immutable `config` property', function () {
    const config = new ServerConfiguration(mockConfigData);

    expect(config.config).toBe(mockConfigData);
    expect(Object.isFrozen(config.config)).toBe(true);
  });



  it('ServerConfiguration.mergeWith() updated `this.config` prop as expected', function () {
    const config = new ServerConfiguration(mockConfigData);
    const newConfigData = {
      appName: 'updated-test-app',

      api: {
        timeout: 3000,
      },

      session: {
        expired: 10000,
      },
    };

    config.mergeWith(newConfigData);

    expect(config.config.appName).toBe(newConfigData.appName);
    expect(config.config.api.timeout).toBe(newConfigData.api.timeout);
    expect(config.config.session.expired).toBe(newConfigData.session.expired);
    expect(config.config.user).toEqual(mockConfigData.user);
    expect(Object.isFrozen(config.config)).toBe(true);
  });


  it('ServerConfiguration.getClientConfig() returned config object with keys listed in `ServerConfiguration.clientPropsList`', function () {
    const config = new ServerConfiguration(mockConfigData);

    const clientConfig = config.getClientConfig();

    expect(clientConfig.get()).toEqual(pick(mockConfigData, config.get(ServerConfiguration.clientPropsList)));
  });


  it('ServerConfiguration.getClientConfig() call threw an exception due to absence of `ServerConfiguration.clientPropsList` key in `this.config` object', function () {
    // mock test config data without `ServerConfiguration.clientPropsList` object key
    const localMockCofingData = {
      appName: 'test-app',
      props: ['x1', 'x2'],
    };

    const config = new ServerConfiguration(localMockCofingData);

    //console.dir(config.getClientConfig());

    expect(() => config.getClientConfig()).toThrow();
  });
});
