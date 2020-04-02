/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
let percyHealthCheck = require('@percy/cypress/task');

module.exports = (on, _config) => {
  on('before:browser:launch', (browser = {}, args) => {
    if (browser.name === 'chrome') {
      args.push('--disable-site-isolation-trials');
      return args;
    }
    return null;
  });
};

module.exports = (on, config) => {
  on('task', percyHealthCheck);
};
