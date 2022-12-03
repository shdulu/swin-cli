/** @format */

'use strict';

function isObject(input) {
  return Object.prototype.toString.call(input) === `[object Object]`;
}

module.exports = {
  isObject,
};
