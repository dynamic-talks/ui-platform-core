import fs from 'fs';

export class ManifestManager {
  static $inject = ['MANIFEST_PATH'];
  static $singleton = true;

  constructor(manifestPath) {
    if(!manifestPath) {
      throw 'Can\'t init ManifestManger instance without passing manifestPath as a param.';
    }
    this.manifestPath = manifestPath;
  }

  setManifest() {
      this._manifest = fs.readFileSync(this.manifestPath);
      console.log('Manifest successfully has been set.');
  }

  get(manifestProp) {
    if(!this._manifest) {
      return console.error(`Trying to get ${manifestProp} prop of not existed manifest. Try to call setManifest method on an instance.`);
    }

    if(!this.manifest[manifestProp]) {
      return console.error(`There's no ${manifestProp} prop found.`);
    }

    return this._manifest[manifestProp];
  }
}
