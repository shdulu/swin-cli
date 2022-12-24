/** @format */

'use strict';
const semver = require('semver');
const colors = require('colors/safe');
const log = require('@swin-cli/log');

const LOWEST_NODE_VERSION = '13.0.0';

class Command {
  constructor(argv) {
    if (!argv) throw new Error('参数不能为空！');
    if (!Array.isArray(argv)) throw new Error('参数必须为数组！');
    if (argv.length < 1) throw new Error('参数列表不能空！');
    this._argv = argv;
    let runner = new Promise((resolve, reject) => {
      let chain = Promise.resolve();
      chain = chain.then(() => this.checkNodeVersion());
      chain = chain.then(() => this.initArgs());
      chain = chain.then(() => this.init());
      chain = chain.then(() => this.exec());
      chain.catch(err => {
        log.error(err.message);
      });
    });
  }
  init() {
    throw new Error('init 必须实现！');
  }
  exec() {
    throw new Error('exec 必须实现！');
  }
  checkNodeVersion() {
    // 第一步，获取当前node版本号
    const currentVersion = process.version;
    //第二步，比对最低版本号
    if (!semver.gte(currentVersion, LOWEST_NODE_VERSION)) {
      throw new Error(colors.red(`swin-cli 需要安装 v${LOWEST_NODE_VERSION} 以上版本的 Node.js`));
    }
  }
  initArgs() {
    this._cmd = this._argv[this._argv.length - 1];
    this._argv = this._argv.slice(0, this._argv.length - 1);
  }
}

module.exports = Command;
