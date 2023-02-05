/** @format */

'use strict';

function isObject(input) {
  return Object.prototype.toString.call(input) === `[object Object]`;
}

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

module.exports = {
  isObject,
  sleep,
  spinnerStart,
};
