/** @format */
const request = require('@swin-cli/request');

module.exports = function () {
  return request({
    url: '/project/template',
  });
};
