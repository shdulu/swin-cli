/** @format */

'use strict'
const path = require('path')
const semver = require('semver')
const colors = require('colors/safe')
const userHome = require('user-home')
const pathExists = require('path-exists').sync
const pkg = require('../package.json')
const log = require('@swin-cli/log')
const constant = require('./const')
let args, config

function core() {
  // 1.检查版本号 -> 2.检查node版本 -> 3.检查root启动 -> 4.检查用户主目录
  // 5.检查入参 -> 6.检查环境变量 -> 7.检查是否为最新版本 -> 8.提示更新
  try {
    debugger
    checkPkgVersion()
    checkNodeVersion()
    checkRoot()
    checkUserHome()
    checkInputArgs()
    checkEnv()
    // --debug 开启模式打印debug log
    log.verbose('debug', 'test debug log')
  } catch (error) {
    log.error(error.message)
  }
}

// 1. 检查版本号
function checkPkgVersion() {
  log.notice('cli', pkg.version)
}

// 2. 检查 node 版本
function checkNodeVersion() {
  // 第一步，获取当前node版本号
  const currentVersion = process.version
  //第二步，比对最低版本号
  const lowestNodeVersion = constant.LOWEST_NODE_VERSION
  if (!semver.gte(currentVersion, lowestNodeVersion)) {
    throw new Error(colors.red(`swin-cli 需要安装 v${lowestNodeVersion} 以上版本的 Node.js`))
  }
}
// 3. 检查 root 账户管理员启动 降级处理
function checkRoot() {
  const rootCheck = require('root-check')
  rootCheck()
}
// 4.检查用户主目录
function checkUserHome() {
  if (!userHome || !pathExists(userHome)) {
    throw new Error(colors.red('当前登录用户主目录不存在！'))
  }
}
// 5.检查入参
function checkInputArgs() {
  const minimist = require('minimist')
  args = minimist(process.argv.slice(2))
  checkArgs()
}
function checkArgs() {
  process.env.LOG_LEVEL = args.debug ? 'verbose' : 'info'
  log.level = process.env.LOG_LEVEL
}
// 6.检查环境变量
function checkEnv() {
  const dotenv = require('dotenv')
  // Default: path.resolve(process.cwd(), '.env')
  let dotenvPath = path.resolve(userHome, '.env')
  if (pathExists(dotenvPath)) {
    dotenv.config({
      path: dotenvPath,
    })
  }
  createDefaultConfig()
  log.verbose('process.env.CLI_HOME_PATH:', process.env.CLI_HOME_PATH)
}
function createDefaultConfig() {
  const cliConfig = {
    home: userHome,
  }
  if (process.env.CLI_HOME) {
    cliConfig['cliHome'] = path.join(userHome, process.env.CLI_HOME)
  } else {
    cliConfig['cliHome'] = path.join(userHome, constant.DEFAULT_CLI_HOME)
  }
  // 设置 cli 缓存目录
  process.env.CLI_HOME_PATH = cliConfig.cliHome
}

module.exports = core
