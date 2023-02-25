/** @format */

'use strict';

const log = require('npmlog');
// 设置level等级
log.level = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : 'info';
// 设置前缀
log.heading = 'swin';
log.headingStyle = { fg: 'white', bg: 'black' };

// 添加自定义命令
log.addLevel('success', 2000, { fg: 'green', bold: true });

module.exports = log;
