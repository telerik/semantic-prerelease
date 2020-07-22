const packageJson = require('../../../package.json');
const generateNotes = require('./generateNotes');

module.exports = function (pluginConfig, {pkg}, cb) {

    const themeVersionSectionDecorator = function() {
    const devDeps = packageJson.devDependencies;
    let log = arguments[1];
    let themesSection = "";

    for (const pack in devDeps) {
        if (pack.match(/@progress\/kendo-theme-/)) {
            themesSection += `* ${pack}: ${devDeps[pack]}\n`;
        }
    }

    if (themesSection.length) {
        themesSection = "#### Themes supported\n\n" + themesSection;
        log += themesSection + "\n";
    }

    arguments[1] = log;
    cb.apply(null, arguments);
  }
  generateNotes(pluginConfig, {pkg}, themeVersionSectionDecorator);
};
