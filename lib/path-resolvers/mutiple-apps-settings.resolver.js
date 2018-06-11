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

      return {
        appName: appDir.replace(/\s/g, ''),
        rootPath: rootAppDir,
        version: resolveAppVersion(rootAppDir),
      };
    });
}
