import path from 'path';
import glob from 'glob';

export function resolvePagesSettings(rootDir) {
  const cwd = path.join(rootDir, 'src', 'ui');
  return {
    cwd,
    routes: glob.sync('**/*.page.js', { cwd })
      .map( pagePath => {
        const dirPath = path.dirname(pagePath, '.page.js');
        const name = path.basename(pagePath, '.page.js');
        const routePath = path.join(dirPath, `${name}.route.js`);
        const clientPath = path.join(dirPath, `${name}.client.js`);
        const dirPieces = dirPath.replace(/^\./, '').split('/');
        let namespace = dirPieces;

        if (namespace[namespace.length - 1] !== name) {
          namespace.push(name);
        }

        return {
          name,
          namespace: namespace.join('.'),
          routePath,
          pagePath,
          clientPath,
          dirPath,
          dirPieces
        }
      })
  };
}
