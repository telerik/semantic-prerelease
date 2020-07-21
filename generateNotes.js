const changelog = require('conventional-changelog')
const parseUrl = require('github-url-from-git')
const lastTag = require('./lastTag');
const packageJson = require('../../../package.json');
module.exports = function (pluginConfig, {pkg}, cb) {
  const repository = pkg.repository ? parseUrl(pkg.repository.url) : null
  const from = lastTag();
  const themeVersionSectionDecorator = function() {
    let log = arguments[1];
    log += "#### Themes dependecies\n\n";
    const devDeps = packageJson.devDependencies;
    for (const pack in devDeps) {
        if (pack.match(/@progress\/kendo-theme-/)) {
            log += `* ${pack}: ${devDeps[pack]}\n`
        }
    }
    log += "\n";
    arguments[1] = log;
    cb.apply(null, arguments);
  }
  changelog({
    version: pkg.version,
    repository: repository,
    from: from,
    file: false
  }, themeVersionSectionDecorator)
};

