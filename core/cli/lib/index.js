/** @format */

'use strict'

const semver = require('semver')
const colors = require('colors/safe')
const userHome = require('user-home')
const pathExists = require('path-exists').sync
const pkg = require('../package.json')
const log = require('@swin-cli/log')
const constant = require('./const')
let args

function core() {
  try {
    debugger
    checkPkgVersion()
    checkNodeVersion()
    checkRoot()
    checkUserHome()
    checkInputArgs()
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
// 检查用户主目录
function checkUserHome() {
  if (!userHome || !pathExists(userHome)) {
    throw new Error(colors.red('当前登录用户主目录不存在！'))
  }
  console.log(userHome)
}
// 检查入参
function checkInputArgs() {
  const minimist = require('minimist')
  args = minimist(process.argv.slice(2))
  console.log(args)
  checkArgs()
}
function checkArgs() {
  process.env.LOG_LEVEL = args.debug ? 'verbose' : 'info'
  log.level = process.env.LOG_LEVEL
}

module.exports = core
