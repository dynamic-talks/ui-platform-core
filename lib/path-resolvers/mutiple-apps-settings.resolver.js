import fs from 'fs';
import path from 'path';
import { resolveAppVersion } from './app-version.resolver';



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

      // read app params from '<APP_DIR>/LAUNCH_PARAMS'
      // todo: will be revised idea behind LAUNCH_PARAMS file
      const appParamsFilename = path.join(rootAppDir, 'LAUNCH_PARAMS');
      let appParams = {};

      if (fs.existsSync(appParamsFilename)) {
        appParams = JSON.parse(fs.readFileSync(appParamsFilename, { encoding: 'utf8' }));
      }

      return {
        name: appDir.replace(/\s/g, ''),
        rootPath: rootAppDir,
        version: resolveAppVersion(rootAppDir),
        configPath: appParams.configPath,
      };
    });
}
