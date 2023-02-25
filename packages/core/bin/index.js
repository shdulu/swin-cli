#! /usr/bin/env node
/** @format */

'use strict';
const importLocal = require('import-local');

if (importLocal(__filename)) {
  // 优先使用本地版本
  require('npmlog').info('cli', '正在使用 swin-cli 本地版本！');
} else {
  require('../lib/index')(process.argv.slice(2));
}
