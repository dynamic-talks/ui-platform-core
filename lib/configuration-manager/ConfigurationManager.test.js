import path from 'path';
import fs from 'fs';
import os from 'os';
import merge from 'lodash.merge';
import { ConfigurationManager } from './ConfigurationManager';
import { ServerConfiguration } from './Configuration/ServerConfiguration';



describe('ConfigurationManager', function () {
  const TEST_APP_NAME = 'ui-platform-test-app';
  const TMP_CONFIG_DIR = 'ui-platform__configs';

  // define default mock config data
  const mockDefaultsConfigData = {
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

  // define specific config data
  const mockSpecificConfigData = {
    appName: 'specific-test-app',

    api: {
      timeout: 3000,
    },

    session: {
      expired: 10000,
    },
  };



  beforeAll(function () {
    // create temporary app dir with config dir as well
    const tmpAppDir       = path.join(os.tmpDir(), TEST_APP_NAME);
    const tmpAppConfigDir = path.join(tmpAppDir, 'config');

    fs.mkdirSync(tmpAppDir);
    fs.mkdirSync(tmpAppConfigDir);

    // create default config file
    fs.writeFileSync(path.join(tmpAppConfigDir, 'defaults.json'), JSON.stringify(mockDefaultsConfigData), {encoding: 'utf8'});

    // create temporary directory for storing specific config files
    const tmpConfigsDir = path.join(os.tmpDir(), TMP_CONFIG_DIR);

    fs.mkdirSync(tmpConfigsDir);

    // create specific config file
    fs.writeFileSync(path.join(tmpConfigsDir, `${TEST_APP_NAME}.json`), JSON.stringify(mockSpecificConfigData), {encoding: 'utf8'});

    // update process specific props with test values
    process.argv = ['node', 'test.js', '--config-dir', tmpConfigsDir];
  });

  it('Initialize Configuration manager with specific config file', function () {
    const configManager = new ConfigurationManager(path.join(os.tmpDir(), TEST_APP_NAME));

    return configManager
      .initialize({ readerType: 'file', appName: TEST_APP_NAME })
      .then((config) => {
        expect(config).toBeInstanceOf(ServerConfiguration);
        expect(config.get()).toEqual(merge({}, mockDefaultsConfigData, mockSpecificConfigData));
      })
      .catch(err => console.error(err));
  });


  afterAll(function () {
    // remove default config file
    const tmpAppDir       = path.join(os.tmpDir(), TEST_APP_NAME);
    const tmpAppConfigDir = path.join(tmpAppDir, 'config');

    fs.unlinkSync(path.join(tmpAppConfigDir, 'defaults.json'));

    // remove temporary app dir with config dir as well
    fs.rmdirSync(tmpAppConfigDir);
    fs.rmdirSync(tmpAppDir);

    // remove specific config file
    const tmpConfigsDir = path.join(os.tmpDir(), TMP_CONFIG_DIR);

    fs.unlinkSync(path.join(tmpConfigsDir, `${TEST_APP_NAME}.json`));

    // remove temporary directory for storing specific config files
    fs.rmdirSync(tmpConfigsDir);
  });
});
