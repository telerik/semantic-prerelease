const changelog = require('conventional-changelog')
const parseUrl = require('github-url-from-git')
const lastTag = require('./lastTag');

module.exports = function (pluginConfig, {pkg}, cb) {
  const repository = pkg.repository ? parseUrl(pkg.repository.url) : null
  const from = lastTag();

  changelog({
    version: pkg.version,
    repository: repository,
    from: from,
    file: false
  }, cb)
};

