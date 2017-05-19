const changelog = require('conventional-changelog')
const parseUrl = require('github-url-from-git')

module.exports = function (pluginConfig, {pkg}, cb) {
  const repository = pkg.repository ? parseUrl(pkg.repository.url) : null
  const from = "v2.3.0"; // TODO: set to git tag of last official version

  changelog({
    version: pkg.version,
    repository: repository,
    from: from,
    file: false
  }, cb)
};

