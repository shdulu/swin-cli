/** @format */

'use strict';
const path = require('path');
const { spawn, log, Package } = require('@swin-cli/utils');
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
    const args = Array.from(arguments);
    const cmd = args[args.length - 1];
    const o = Object.create(null);
    Object.keys(cmd).forEach(key => {
      if (cmd.hasOwnProperty(key) && !key.startsWith('_') && key !== 'parent') {
        o[key] = cmd[key];
      }
    });
    args[args.length - 1] = o;
    const code = `require('${rootFile}').call(null, ${JSON.stringify(args)})`;
    /**
     * https://www.nodeapp.cn/child_process.html#child_process_child_process_spawn_command_args_options
     * child_process.spawn(command[, args][, options])
     * 1. command<string> 要运行的命令
     * 2. args<Array> 字符串参数列表
     * 3. options <Object>
     *  - cwd 子进程的当前工作目录。
     *  - stdio <Array> | <string> 子进程的 stdio 配置
     * */
    const child = spawn('node', ['-e', code], {
      cwd: process.cwd(),
      stdio: 'inherit',
    });
    child.on('error', e => {
      log.error(e.message);
      process.exit(1);
    });
    child.on('exit', e => {
      log.verbose('命令执行成功：' + e);
      process.exit(e);
    });
  } catch (error) {
    log.error(error.message);
    if (process.env.LOG_LEVEL === 'verbose') {
      console.log(error);
    }
  }
}
