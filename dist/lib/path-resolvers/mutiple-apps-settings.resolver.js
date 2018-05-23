'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveMultipleAppsSettings = resolveMultipleAppsSettings;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Read app artifact folders from supplied `rootDir` and prepare list of meta information
 * @param {String} rootDir
 * @returns {Array}
 */
function resolveMultipleAppsSettings(rootDir) {
  return _fs2.default.readdirSync(rootDir, { encoding: 'utf8' })
  // gather directories only
  .filter(function (dirItem) {
    return dirItem.search(/^\./) === -1 && _fs2.default.statSync(_path2.default.join(rootDir, dirItem)).isDirectory();
  }).map(function (appDir) {
    var rootAppDir = _path2.default.join(rootDir, appDir);

    // prepare app version file
    var appVersionFilename = _path2.default.join(rootAppDir, 'VERSION');
    var appVersion = '0.0.0';

    if (_fs2.default.existsSync(appVersionFilename)) {
      appVersion = _fs2.default.readFileSync(appVersionFilename, { encoding: 'utf8' }).trim();
    } else {
      console.warn('"VERSION" file isn\'t found in ' + rootAppDir);
    }

    // read app params from '<APP_DIR>/LAUNCH_PARAMS'
    var appParamsFilename = _path2.default.join(rootAppDir, 'LAUNCH_PARAMS');
    var appParams = {};

    if (_fs2.default.existsSync(appParamsFilename)) {
      appParams = JSON.parse(_fs2.default.readFileSync(appParamsFilename, { encoding: 'utf8' }));
    } else {
      console.warn('"PARAMS" file isn\'t found in ' + rootAppDir);
    }

    return {
      name: appDir.replace(/\s/g, ''),
      rootPath: rootAppDir,
      version: appVersion,
      params: appParams
    };
  });
}