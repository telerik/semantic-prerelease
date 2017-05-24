const changelog = require('conventional-changelog')
const parseUrl = require('github-url-from-git')
const execSync = require('child_process').execSync;

const describe = () => execSync('git describe --tags origin/master', { encoding: 'utf8' });
const baseTag = (tag) => tag.replace(/(v[0-9.]+)(.*)/, '$1').trim();
const lastTag = () => baseTag(describe());

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

