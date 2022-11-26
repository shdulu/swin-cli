/** @format */

'use strict'

const semver = require('semver')
const colors = require('colors/safe')
const pkg = require('../package.json')
const log = require('@swin-cli/log')
const constant = require('./const')

function core() {
  try {
    checkPkgVersion()
    checkNodeVersion()
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

module.exports = core
