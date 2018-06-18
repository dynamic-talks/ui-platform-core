export class AssetsManifestManager {
  static $inject = ['MANIFEST_PATH'];
  static $singleton = true;

  constructor(manifestPath) {
    if(!manifestPath) {
      throw new Error('Can\'t init ManifestManger instance without passing manifestPath as a param.');
    }
    this.loadManifest(manifestPath);
  }

  loadManifest(manifestPath) {
      if(!this._manifest) {
        this._manifest = require(manifestPath);
      }
  }

  has(manifestProp) {
    return this._manifest && this._manifest[manifestProp];
  }

  get(manifestProp) {
    if(!this._manifest) {
      return console.error(`Trying to get ${manifestProp} prop of not existed manifest. Try to call loadManifest method on an instance.`);
    }

    if(this.has(manifestProp)) {
      return this._manifest[manifestProp];
    }

    throw new Error(`There's no ${manifestProp} prop found. ${Object.keys(this._manifest)}`)
  }
}
