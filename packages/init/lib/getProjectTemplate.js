/** @format */
const { request } = require('@swin-cli/utils');
const template = require('./template.json');

module.exports = function () {
  return template.RECORDS;
  // return request({
  //   url: '/mock/26/api/templates',
  // });
};
