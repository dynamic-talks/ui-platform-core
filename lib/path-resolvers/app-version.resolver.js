import fs from 'fs';
import path from 'path';



/**
 * Find and read app version in app folder supplied by `rootAppDir` argument
 * At first it tries to find version value in `VERSION` file
 * otherwise read it from `package.json` of current app
 *
 * @param {String} rootAppDir
 * @returns {String}
 */
export function resolveAppVersion(rootAppDir) {
  const appVersionFilename = path.join(rootAppDir, 'VERSION');

  if (fs.existsSync(appVersionFilename)) {
    return fs.readFileSync(appVersionFilename, { encoding: 'utf8' }).trim();
  } else {
    return require(path.join(rootAppDir, 'package.json')).version;
  }
}
