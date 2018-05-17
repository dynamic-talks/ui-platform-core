'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ManifestManager = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ManifestManager = exports.ManifestManager = function () {
  function ManifestManager(manifestPath) {
    _classCallCheck(this, ManifestManager);

    if (!manifestPath) {
      throw 'Can\'t init ManifestManger instance without passing manifestPath as a param.';
    }
    this.manifestPath = manifestPath;
  }

  _createClass(ManifestManager, [{
    key: 'setManifest',
    value: function setManifest() {
      this._manifest = _fs2.default.readFileSync(this.manifestPath);
      console.log('Manifest successfully has been set.');
    }
  }, {
    key: 'get',
    value: function get(manifestProp) {
      if (!this._manifest) {
        return console.error('Trying to get ' + manifestProp + ' prop of not existed manifest. Try to call setManifest method on an instance.');
      }

      if (!this.manifest[manifestProp]) {
        return console.error('There\'s no ' + manifestProp + ' prop found.');
      }

      return this._manifest[manifestProp];
    }
  }]);

  return ManifestManager;
}();

ManifestManager.$inject = ['MANIFEST_PATH'];
ManifestManager.$singleton = true;