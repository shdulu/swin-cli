/** @format */

'use strict';
const log = require('./log');
const formatPath = require('./formatPath');
const npm = require('./npm');
const request = require('./request');
const Package = require('./Package');
const utils = require('./utils');

function spinnerStart(msg, spinnerStr = '|/-\\') {
  const Spinner = require('cli-spinner').Spinner;
  const spinner = new Spinner(msg + ' %s');
  spinner.setSpinnerString(spinnerStr);
  spinner.start();
  return spinner;
}

function sleep(timeout = 1000) {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

function spawn(command, args, options) {
  const win32 = process.platform === 'win32';
  const cmd = win32 ? 'cmd' : command;
  const cmdArgs = win32 ? ['/c'].concat(command, args) : args;
  return require('child_process').spawn(cmd, cmdArgs, options || {});
}

function spawnAsync(command, args, options) {
  return new Promise((resolve, reject) => {
    const p = spawn(command, args, options);
    p.on('error', e => {
      reject(e);
    });
    p.on('exit', c => {
      resolve(c);
    });
  });
}

module.exports = {
  log,
  request,
  npm,
  Package,
  formatPath,
  utils,
  sleep,
  spinnerStart,
  spawn,
  spawnAsync,
};
