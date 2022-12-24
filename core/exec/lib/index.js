/** @format */

'use strict';
const path = require('path');
const log = require('@swin-cli/log');
const Package = require('@swin-cli/package');

const SETTINGS = {
  init: '@swin-cli/init',
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

  const cmdObj = arguments[arguments.length - 1];
  const cmdName = cmdObj.name();
  const packageName = SETTINGS[cmdName];
  const packageVersion = 'latest';

  if (!targetPath) {
    targetPath = path.resolve(homePath, CACHE_DIR); // 生成缓存路径
    storeDir = path.resolve(targetPath, 'node_modules');
    log.verbose('3. targetPath：', targetPath);
    log.verbose('4. storeDir：', storeDir);
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
  // D:/myProject/cli/swin-cli/commands/init/lib/index.js
  try {
    // 捕获 异步异常错误
    if (rootFile) require(rootFile).call(null, Array.from(arguments));
  } catch (error) {
    log.error(error.message);
  }
}
