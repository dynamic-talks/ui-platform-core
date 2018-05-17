export class ManifestManager {
  static $inject = ['MANIFEST_PATH'];
  static $singleton = true;

  constructor(manifestPath) {
    if(!manifestPath) {
      throw 'Can\'t init ManifestManger instance without passing manifestPath as a param.';
    }
    this.manifestPath = manifestPath;
    this.setManifest();
  }

  setManifest() {
      if(!this._manifest) {
        this._manifest = require(this.manifestPath);
      }

      console.log(`Manifest successfully has been set. ${this._manifest}`);
  }

  get(manifestProp) {
    if(!this._manifest) {
      return console.error(`Trying to get ${manifestProp} prop of not existed manifest. Try to call setManifest method on an instance.`);
    }

    return this._manifest[manifestProp] || console.error(`There's no ${manifestProp} prop found. ${Object.keys(this._manifest)}`);
  }
}
