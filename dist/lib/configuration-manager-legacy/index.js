'use strict';

var ConfigurationManager = require('./modules/ConfigurationManager');
var ServerConfigurationManager = require('./modules/ServerConfigurationManager');
var ConfigurationReader = require('./modules/ConfigurationReader');
var util = require('util');
var path = require('path');

var config = new ConfigurationReader({
  baseConfigPath: path.resolve(__dirname, '../../../../config/base.yaml'),
  envConfigPath: path.resolve(__dirname, '../../../../config/development.yaml')
}).getConfig();

var serverConfig = new ServerConfigurationManager({ config: config });
var clientConfig = new ConfigurationManager({ config: serverConfig.getClientConfiguration() });

console.info('serverConfig is ' + util.inspect(serverConfig.config));
console.info('clientConfig is ' + util.inspect(clientConfig.config));