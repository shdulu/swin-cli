/** @format */

'use strict';
const path = require('path');
const log = require('@swin-cli/log');
const Package = require('@swin-cli/package');

const SETTINGS = {
  init: '@swin-cli/utils',
};
const CACHE_DIR = 'dependencies';

module.exports = exec;

async function exec() {
  // 本地init包路径 - D:\myProject\cli\swin-cli\commands\init
  let targetPath = process.env.CLI_TARGET_PATH;
  // package 缓存路径
  const homePath = process.env.CLI_HOME_PATH;
  let storeDir, pkg;
  log.verbose('1. targetPath：', targetPath);
  log.verbose('2. homePath：', homePath);

  // 1. tatgetPath -> modulePath
  // 2. modulePath -> Package(npm模块)
  // 3. Package.getRootFile(获取入口文件)
  // 4. Package.update / Package.install
  const cmdObj = arguments[arguments.length - 1];
  const cmdName = cmdObj.name();
  const packageName = SETTINGS[cmdName];
  const packageVersion = 'latest';

  if (!targetPath) {
    targetPath = path.resolve(homePath, CACHE_DIR); // 生成缓存路径
    storeDir = path.resolve(targetPath, 'node_modules');
    log.verbose('1. targetPath：', targetPath);
    log.verbose('2. storeDir：', storeDir);
    pkg = new Package({
      storeDir,
      targetPath,
      packageName,
      packageVersion,
    });
    if (await pkg.exists()) {
      // 更新 package
      await pkg.update();
    } else {
      // 安装 package
      await pkg.install();
    }
  } else {
    pkg = new Package({
      targetPath,
      packageName,
      packageVersion,
    });
  }
  const rootFile = pkg.getRootFilePath();
  if (rootFile) {
    require(rootFile).apply(null, arguments);
  }
}
