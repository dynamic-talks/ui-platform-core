'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveAppVersion = resolveAppVersion;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Find and read app version in app folder supplied by `rootAppDir` argument
 * At first it tries to find version value in `VERSION` file
 * otherwise read it from `package.json` of current app
 *
 * @param {String} rootAppDir
 * @returns {String}
 */
function resolveAppVersion(rootAppDir) {
  var appVersionFilename = _path2.default.join(rootAppDir, 'VERSION');

  if (_fs2.default.existsSync(appVersionFilename)) {
    return _fs2.default.readFileSync(appVersionFilename, { encoding: 'utf8' }).trim();
  } else {
    return require(_path2.default.join(rootAppDir, 'package.json')).version;
  }
}