/** @format */

'use strict';
const path = require('path');
const { isObject } = require('@swin-cli/utils');
const { formatPath } = require('@swin-cli/format-path');
const { getDefaultRegistry } = require('@swin-cli/get-npm-info');
const pkgDir = require('pkg-dir').sync;
class Package {
  constructor(options) {
    if (!options) throw new Error('Package 类的 options 参数不能为空！');
    if (!isObject(options)) throw new Error('Package 类的 options 参数必须为对象！');
    // package 的目标路径
    this.targetPath = options.targetPath;
    // 缓存package的路径
    this.storeDir = options.storeDir;
    // package name
    this.packageName = options.name;
    // package 的版本
    this.packageVersion = options.version;
  }
  // 判断当前Package 是否存在
  exists() {}
  // 安装 Package
  install() {
    npminstall({
      root: this.targetPath,
      storeDir: this.storeDir,
      registry: getDefaultRegistry(),
      pkgs: [{ name: this.packageName, version: this.packageVersion }],
    });
  }
  // 更新 Package
  update() {}
  // 获取入口文件的路径
  getRootFilePath() {
    // 1. 获取package.json 所在的目录 pkg-dir
    const dir = pkgDir(this.targetPath);
    // 2. 读取package.json  - require()
    if (dir) {
      const pkgFile = require(path.resolve(dir, 'package.json'));
      // 3. main/lib - path
      if (pkgFile && pkgFile.main) {
        // 4. 路径的兼容(mscOS/windows)
        return formatPath(path.resolve(dir, pkgFile.main));
      }
    }
    return null;
  }
}
module.exports = Package;
