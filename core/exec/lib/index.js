/** @format */

'use strict';

const Package = require('@swin-cli/package');

module.exports = exec;

function exec() {
  const pkg = new Package();
  console.log(pkg);
  console.log('CLI_TARGET_PATH', process.env.CLI_TARGET_PATH);
  console.log('exCLI_HOME_PATHec', process.env.CLI_HOME_PATH);
  // 1. tatgetPath -> modulePath
  // 2. modulePath -> Package(npm模块)
  // 3. Package.getRootFile(获取入口文件)
  // 4. Package.update / Package.install
}
