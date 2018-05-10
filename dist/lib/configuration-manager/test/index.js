'use strict';

var ConfigurationManager = require('../modules/ConfigurationManager');
var ConfigurationReader = require('../modules/ConfigurationReader');
var ServerConfigurationManager = require('../modules/ServerConfigurationManager');
var path = require('path');

var chai = require('chai');
var expect = chai.expect;

var config = new ConfigurationReader().getConfig();

var serverConfig = new ServerConfigurationManager(config);
var clientConfig = new ConfigurationManager(serverConfig.getClientConfiguration());

process.env.NODE_ENV = 'qa1';

var qaConfig = new ConfigurationReader({
  configDir: path.resolve(__dirname, './configs'),
  env: process.env.NODE_ENV
}).getConfig();

var qaServerConfig = new ServerConfigurationManager(qaConfig);

describe('config manager', function () {
  it('base config specific prop should remain after merge', function () {
    expect(serverConfig.get('baseConfigProp')).equal('baseConfigValue');
  });

  it('client config should contain client specific props only', function () {
    expect(clientConfig.get('some_array')).to.eql(['one', 'two', 'three']);
    expect(clientConfig.get('baseConfigProp')).be.undefined;
  });

  it('env config should have higher priority than base config', function () {
    expect(serverConfig.get('obj.someShareProp')).equal('development');
    expect(qaServerConfig.get('obj.someShareProp')).equal('qa1');
  });
});