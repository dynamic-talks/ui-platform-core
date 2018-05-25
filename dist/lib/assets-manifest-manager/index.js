"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AssetsManifestManager = exports.AssetsManifestManager = function () {
  function AssetsManifestManager(manifest) {
    _classCallCheck(this, AssetsManifestManager);

    this._manifest = manifest;
  }

  _createClass(AssetsManifestManager, [{
    key: "getAllPaths",
    value: function getAllPaths() {
      return this._manifest;
    }
  }, {
    key: "get",
    value: function get(manifestProp) {
      if (!this._manifest) {
        return console.error("Trying to get " + manifestProp + " prop of not existed manifest. Try to call loadManifest method on an instance.");
      }

      if (this._manifest[manifestProp]) {
        return this._manifest[manifestProp];
      }

      throw new Error("There's no " + manifestProp + " prop found. " + Object.keys(this._manifest));
    }
  }]);

  return AssetsManifestManager;
}();

AssetsManifestManager.$singleton = true;