'use strict';

var _ServerConfiguration = require('./ServerConfiguration');

var _lodash = require('lodash.pick');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('ServerConfiguration', function () {

  // define mock config data
  var mockConfigData = _defineProperty({
    appName: 'test-app',

    api: {
      endpoint: 'http://test.com',
      timeout: 5000
    },

    session: {
      id: 'sessionid',
      expired: 3000
    },

    user: {
      roles: ['admin', 'guest'],
      nickname: 'testuser',
      demographic: {
        age: 27,
        gender: 'man'
      }
    }

  }, _ServerConfiguration.ServerConfiguration.clientPropsList, ['user', 'api']);

  it('ServerConfiguration is instantiated with expected and immutable `config` property', function () {
    var config = new _ServerConfiguration.ServerConfiguration(mockConfigData);

    expect(config.config).toBe(mockConfigData);
    expect(Object.isFrozen(config.config)).toBe(true);
  });

  it('ServerConfiguration.mergeWith() updated `this.config` prop as expected', function () {
    var config = new _ServerConfiguration.ServerConfiguration(mockConfigData);
    var newConfigData = {
      appName: 'updated-test-app',

      api: {
        timeout: 3000
      },

      session: {
        expired: 10000
      }
    };

    config.mergeWith(newConfigData);

    expect(config.config.appName).toBe(newConfigData.appName);
    expect(config.config.api.timeout).toBe(newConfigData.api.timeout);
    expect(config.config.session.expired).toBe(newConfigData.session.expired);
    expect(config.config.user).toEqual(mockConfigData.user);
    expect(Object.isFrozen(config.config)).toBe(true);
  });

  it('ServerConfiguration.getClientConfig() returned config object with keys listed in `ServerConfiguration.clientPropsList`', function () {
    var config = new _ServerConfiguration.ServerConfiguration(mockConfigData);

    var clientConfig = config.getClientConfig();

    expect(clientConfig.get()).toEqual((0, _lodash2.default)(mockConfigData, config.get(_ServerConfiguration.ServerConfiguration.clientPropsList)));
  });

  it('ServerConfiguration.getClientConfig() call threw an exception due to absence of `ServerConfiguration.clientPropsList` key in `this.config` object', function () {
    // mock test config data without `ServerConfiguration.clientPropsList` object key
    var localMockCofingData = {
      appName: 'test-app',
      props: ['x1', 'x2']
    };

    var config = new _ServerConfiguration.ServerConfiguration(localMockCofingData);

    //console.dir(config.getClientConfig());

    expect(function () {
      return config.getClientConfig();
    }).toThrow();
  });
});