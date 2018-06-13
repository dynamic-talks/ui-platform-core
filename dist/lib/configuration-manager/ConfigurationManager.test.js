'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

var _ConfigurationManager = require('./ConfigurationManager');

var _ServerConfiguration = require('./Configuration/ServerConfiguration');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('ConfigurationManager', function () {
  var TEST_APP_NAME = 'ui-platform-test-app';
  var TMP_CONFIG_DIR = 'ui-platform__configs';

  // define default mock config data
  var mockDefaultsConfigData = _defineProperty({
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

  // define specific config data
  var mockSpecificConfigData = {
    appName: 'specific-test-app',

    api: {
      timeout: 3000
    },

    session: {
      expired: 10000
    }
  };

  beforeAll(function () {
    // create temporary app dir with config dir as well
    var tmpAppDir = _path2.default.join(_os2.default.tmpDir(), TEST_APP_NAME);
    var tmpAppConfigDir = _path2.default.join(tmpAppDir, 'config');

    _fs2.default.mkdirSync(tmpAppDir);
    _fs2.default.mkdirSync(tmpAppConfigDir);

    // create default config file
    _fs2.default.writeFileSync(_path2.default.join(tmpAppConfigDir, 'defaults.json'), JSON.stringify(mockDefaultsConfigData), { encoding: 'utf8' });

    // create temporary directory for storing specific config files
    var tmpConfigsDir = _path2.default.join(_os2.default.tmpDir(), TMP_CONFIG_DIR);

    _fs2.default.mkdirSync(tmpConfigsDir);

    // create specific config file
    _fs2.default.writeFileSync(_path2.default.join(tmpConfigsDir, TEST_APP_NAME + '.json'), JSON.stringify(mockSpecificConfigData), { encoding: 'utf8' });

    // update process specific props with test values
    process.argv = ['node', 'test.js', '--config-dir', tmpConfigsDir];
  });

  it('Initialize Configuration manager with specific config file', function () {
    var configManager = new _ConfigurationManager.ConfigurationManager(_path2.default.join(_os2.default.tmpDir(), TEST_APP_NAME));

    return configManager.initialize({ readerType: 'file', appName: TEST_APP_NAME }).then(function (config) {
      expect(config).toBeInstanceOf(_ServerConfiguration.ServerConfiguration);
      expect(config.get()).toEqual((0, _lodash2.default)({}, mockDefaultsConfigData, mockSpecificConfigData));
    }).catch(function (err) {
      return console.error(err);
    });
  });

  afterAll(function () {
    // remove default config file
    var tmpAppDir = _path2.default.join(_os2.default.tmpDir(), TEST_APP_NAME);
    var tmpAppConfigDir = _path2.default.join(tmpAppDir, 'config');

    _fs2.default.unlinkSync(_path2.default.join(tmpAppConfigDir, 'defaults.json'));

    // remove temporary app dir with config dir as well
    _fs2.default.rmdirSync(tmpAppConfigDir);
    _fs2.default.rmdirSync(tmpAppDir);

    // remove specific config file
    var tmpConfigsDir = _path2.default.join(_os2.default.tmpDir(), TMP_CONFIG_DIR);

    _fs2.default.unlinkSync(_path2.default.join(tmpConfigsDir, TEST_APP_NAME + '.json'));

    // remove temporary directory for storing specific config files
    _fs2.default.rmdirSync(tmpConfigsDir);
  });
});