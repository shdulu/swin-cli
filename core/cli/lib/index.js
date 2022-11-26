/** @format */

'use strict'

const pkg = require('../package.json')
const log = require('@swin-cli/log')
const constant = require('./const')

function core() {
  checkPkgVersion()
  checkNodeVersion()
}

// 1. 检查版本号
function checkPkgVersion() {
  log.notice('cli', pkg.version)
}

// 2. 检查 node 版本
function checkNodeVersion() {
  // 第一步，获取当前node版本号
  console.log(process.version)
  const currentVersion = process.version
  //第二步，比对最低版本号
  const lowestNodeVersion = constant.LOWEST_NODE_VERSION
}

module.exports = core
