/** @format */
const { request } = require('@swin-cli/utils');

module.exports = function () {
  return request({
    url: '/project/template',
  });
};
