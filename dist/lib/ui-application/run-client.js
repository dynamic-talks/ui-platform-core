'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runClientApp = undefined;

var _client = require('./client.ioc-container');

var runClientApp = exports.runClientApp = function runClientApp(mainModule) {
  var iocContainer = (0, _client.createClientIoCContainer)(window.__CONFIG__, window.__MANIFEST__);

  var app = iocContainer.resolve('app');

  app.addModule(mainModule);
  app.configure({ state: window.__STATE__ }).run();

  delete window.__CONFIG__;
  delete window.__STATE__;
  delete window.__MANIFEST__;
};