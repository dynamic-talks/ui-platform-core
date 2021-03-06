import { Configuration } from './Configuration';


describe('Configuration', function () {

  // define mock config data
  const mockConfigData = {
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
    }
  };


  it('Configuration is instantiated with expected and immutable `config` property', function () {
    const configManager = new Configuration(mockConfigData);

    expect(configManager.config).toBe(mockConfigData);
    expect(Object.isFrozen(configManager.config)).toBe(true);
  });



  it('Configuration.get() is provided nested config value with supplied config path (dot notation)', function () {
    const configManager = new Configuration(mockConfigData);

    expect(configManager.get('api')).toBe(mockConfigData.api);
    expect(configManager.get('session.id')).toBe(mockConfigData.session.id);
    expect(configManager.get('user.demographic.age')).toBe(mockConfigData.user.demographic.age);
  });


  it('Configuration.get() threw exception in case of supplying non-existed config key', function () {
    const configManager = new Configuration(mockConfigData);

    expect(() => configManager.get('non-existed')).toThrow();
  });


  it('Configuration.get() threw exception in case of supplying non-existed config path', function () {
    const configManager = new Configuration(mockConfigData);

    expect(() => configManager.get('non.existed')).toThrow();
  });
});
