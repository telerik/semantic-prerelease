const changelog = require('conventional-changelog')
const parseUrl = require('github-url-from-git')
const lastTag = require('./lastTag');

module.exports = function (pluginConfig, {pkg}, cb) {
  const repository = pkg.repository ? parseUrl(pkg.repository.url) : null
  const from = lastTag();
  const themeVersionSectionDecorator = function() {
    //if( theme change since last master ) generate and add required theme section
    cb.apply(null, arguments);
  }
  changelog({
    version: pkg.version,
    repository: repository,
    from: from,
    file: false
  }, cb)
};

