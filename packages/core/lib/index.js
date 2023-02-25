/** @format */

'use strict';
const path = require('path');
const semver = require('semver');
const colors = require('colors/safe');
const userHome = require('user-home');
const commander = require('commander');
const pathExists = require('path-exists').sync;
const { log, npm } = require('@swin-cli/utils');
const execCommand = require('./exec');
const constant = require('./const');
const pkg = require('../package.json');

const program = new commander.Command();

async function main() {
  try {
    await prepare();
    // 这里的try catch 捕获不到registerCommand里的异步方法
    registerCommand();
  } catch (error) {
    log.error(error.message);
    if (program.debug) {
      console.log(error);
    }
  }
}

// 1. 脚手架启动阶段
async function prepare() {
  checkPkgVersion();
  checkRoot();
  checkUserHome();
  checkEnv();
  await checkGlobalUpdate();
}

// 1. 检查版本号
function checkPkgVersion() {
  log.notice('cli', pkg.version);
}

// 3. 检查 root 账户管理员启动 降级处理
function checkRoot() {
  const rootCheck = require('root-check');
  rootCheck();
}
// 4.检查用户主目录
function checkUserHome() {
  if (!userHome || !pathExists(userHome)) {
    throw new Error(colors.red('当前登录用户主目录不存在！'));
  }
}

// 6.检查环境变量
function checkEnv() {
  const dotenv = require('dotenv');
  // Default: path.resolve(process.cwd(), '.env')
  let dotenvPath = path.resolve(userHome, '.env');
  if (pathExists(dotenvPath)) {
    dotenv.config({
      path: dotenvPath,
    });
  }
  createDefaultConfig();
}
function createDefaultConfig() {
  const cliConfig = {
    home: userHome,
  };
  if (process.env.CLI_HOME) {
    cliConfig['cliHome'] = path.join(userHome, process.env.CLI_HOME);
  } else {
    cliConfig['cliHome'] = path.join(userHome, constant.DEFAULT_CLI_HOME);
  }
  // 设置 cli 缓存目录
  process.env.CLI_HOME_PATH = cliConfig.cliHome;
}
// 7.检查是否为最新版本 & 8.提示更新
async function checkGlobalUpdate() {
  // 1. 获取当前版本号和模块名
  const currentVersion = pkg.version;
  const npmName = pkg.name;
  // 2. 调用 npm API， 获取所有版本号
  const lastVersion = await npm.getNpmSemverVersion(currentVersion, npmName);
  if (lastVersion && semver.gt(lastVersion, currentVersion)) {
    log.warn(
      colors.yellow(
        `请手动更新 ${npmName}, 当前版本：${currentVersion}, 最新版本: ${lastVersion} 更新命令：npm install -g ${npmName}`
      )
    );
  }
  // 3. 提取所有版本号，比对那些版本号是大于当前版本号
  // 4. 获取最新的版本号，提示用户更新到该版本
}
function registerCommand() {
  program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(pkg.version)
    .option('-d, --debug', '是否开启调试模式', false)
    .option('-tp, --targetPath <targetPath>', '是否指定本地调试文件路径', '');

  program
    .command('init [projectName]')
    .option('-f, --force', '是否强制初始化项目', false)
    .action(execCommand);

  // 开启debug模式
  program.on('option:debug', () => {
    process.env.LOG_LEVEL = program.debug ? 'verbose' : 'info';
    log.level = process.env.LOG_LEVEL;
  });

  // 指定 targetPath - 到环境变量
  program.on('option:targetPath', () => {
    process.env.CLI_TARGET_PATH = program.targetPath;
  });

  // 监听未注册的命令
  program.on('command:*', obj => {
    const availableCommands = program.commands.map(cmd => cmd.name());
    console.log(colors.red('未知命令：' + obj[0]));
    if (availableCommands.length > 0) {
      console.log(colors.red('可用命令：' + availableCommands.join(',')));
    }
  });
  program.parse(process.argv);
  if (program.args && program.args.length < 1) {
    // 没有指定命令 - 打印帮助文档
    program.outputHelp();
  }
}
module.exports = main;
