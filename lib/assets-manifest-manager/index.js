export class AssetsManifestManager {
  static $singleton = true;

  constructor(manifest) {
    this._manifest = manifest;
  }

  getAllPaths() {
    return this._manifest;
  }

  get(manifestProp) {
    if(!this._manifest) {
      return console.error(`Trying to get ${manifestProp} prop of not existed manifest. Try to call loadManifest method on an instance.`);
    }

    if(this._manifest[manifestProp]) {
      return this._manifest[manifestProp];
    }

    throw new Error(`There's no ${manifestProp} prop found. ${Object.keys(this._manifest)}`)
  }
}
