'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvePagesSettings = resolvePagesSettings;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resolvePagesSettings(rootDir) {
  var cwd = _path2.default.join(rootDir, 'src', 'ui');
  return {
    cwd: cwd,
    routes: _glob2.default.sync('**/*.page.js', { cwd: cwd }).map(function (pagePath) {
      var dirPath = _path2.default.dirname(pagePath, '.page.js');
      var name = _path2.default.basename(pagePath, '.page.js');
      var routePath = _path2.default.join(dirPath, name + '.route.js');
      var clientPath = _path2.default.join(dirPath, name + '.client.js');
      var dirPieces = dirPath.replace(/^\./, '').split('/');
      var namespace = dirPieces;

      if (namespace[namespace.length - 1] !== name) {
        namespace.push(name);
      }

      return {
        name: name,
        namespace: namespace.join('.'),
        routePath: routePath,
        pagePath: pagePath,
        clientPath: clientPath,
        dirPath: dirPath,
        dirPieces: dirPieces
      };
    })
  };
}