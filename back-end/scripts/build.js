const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const Promise = require('bluebird');
const ncp = require('ncp');
const rimraf = require('rimraf');
const copyNodeModule = require('copy-node-modules');

const rimrafAsync = Promise.promisify(rimraf);

const rootDir = process.cwd();
const srcDir = path.join(rootDir, 'src');
const dstDir = path.join(rootDir, 'dist');
const packageJSON = require(path.join(rootDir, 'package.json'));

function cleanDist() {
  return rimrafAsync(dstDir);
}

function copySrc() {
  const ncpOpts = {
    filter: /^((?!spec).)*$/,
    stopOnErr: true
  };

  return new Promise((resolve, reject) => {
    ncp(srcDir, dstDir, ncpOpts, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

function copyPackageJSON() {
  const packageJSONTrimmed = _.pick(packageJSON, ['name', 'engines', 'version', 'dependencies']);
  fs.writeFileSync(path.join(dstDir, 'package.json'), JSON.stringify(packageJSONTrimmed, null, 2));
}

function copyNodeModules() {
  return new Promise((resolve, reject) => {
    copyNodeModule(rootDir, dstDir, { devDependencies: false }, (err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

(async () => {
  try {
    await cleanDist();
    await copySrc();
    await copyNodeModules();
    copyPackageJSON();
    process.stdout.write('Build success');
  } catch (err) {
    process.stderr.write(`Build fail: ${err.toString()}`);
  }
})();
