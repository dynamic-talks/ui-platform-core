import fs from 'fs';
import path from 'path';



/**
 * Read app artifact folders from supplied `rootDir` and prepare list of meta information
 * @param {String} rootDir
 * @returns {Array}
 */
export function resolveMultipleAppsSettings(rootDir) {
  return fs.readdirSync(rootDir, { encoding: 'utf8' })
    // gather directories only
    .filter(dirItem => dirItem.search(/^\./) === -1 && fs.statSync(path.join(rootDir, dirItem)).isDirectory())
    .map(appDir => {
      const rootAppDir = path.join(rootDir, appDir);

      // prepare app version file
      const appVersionFilename = path.join(rootAppDir, 'VERSION');
      let appVersion = '0.0.0';

      if (fs.existsSync(appVersionFilename)) {
        appVersion = fs.readFileSync(appVersionFilename, { encoding: 'utf8' }).trim();
      } else {
        console.warn(`"VERSION" file isn't found in ${rootAppDir}`);
      }

      // read app params from '<APP_DIR>/PARAMS'
      const appParamsFilename = path.join(rootAppDir, 'PARAMS');
      let appParams = {};

      if (fs.existsSync(appParamsFilename)) {
        appParams = JSON.parse(fs.readFileSync(appParamsFilename, { encoding: 'utf8' }));
      } else {
        console.warn(`"PARAMS" file isn't found in ${rootAppDir}`);
      }

      return {
        name: appDir.replace(/\s/g, ''),
        rootDir: rootAppDir,
        version: appVersion,
        params: appParams,
      };
    });
}
