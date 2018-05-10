const ConfigurationManager = require('./modules/ConfigurationManager');
const ServerConfigurationManager = require('./modules/ServerConfigurationManager');
const ConfigurationReader = require('./modules/ConfigurationReader');
const util = require('util');
const path = require('path');

const config = new ConfigurationReader({
  baseConfigPath: path.resolve(__dirname, '../../../../config/base.yaml'),
  envConfigPath: path.resolve(__dirname, '../../../../config/development.yaml')
}).getConfig();

const serverConfig = new ServerConfigurationManager({config});
const clientConfig = new ConfigurationManager({config: serverConfig.getClientConfiguration()});


console.log(`serverConfig is ${util.inspect(serverConfig.config)}`);
console.log(`clientConfig is ${util.inspect(clientConfig.config)}`);
