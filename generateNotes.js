const changelog = require('conventional-changelog')
const parseUrl = require('github-url-from-git')
const execSync = require('child_process').execSync;

const lastTag = () => execSync('git describe --tags --abbrev=0 origin/master', { encoding: 'utf8' }).trim();

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

