const changelog = require('conventional-changelog')
const parseUrl = require('github-url-from-git')
const lastTag = require('./lastTag');
const packageJson = require('../../../package.json');
module.exports = function (pluginConfig, {pkg}, cb) {
  const repository = pkg.repository ? parseUrl(pkg.repository.url) : null
  const from = lastTag();
  const themeVersionSectionDecorator = function() {
    const devDeps = packageJson.devDependencies;
    let log = arguments[1];
    let themeSection = "";
    for (const pack in devDeps) {
        if (pack.match(/@progress\/kendo-theme-/)) {
            themeSection += `* ${pack}: ${devDeps[pack]}\n`
        }
    }
    if (themeSection.length) {
        themeSection = "#### Themes supported\n\n" + themeSection;
        log += themeSection + "\n";
    }
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

