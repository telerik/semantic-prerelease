var SRError = require('@semantic-release/error')

module.exports = function (pluginConfig, config, cb) {
  var env = config.env

  if (!env.hasOwnProperty('GITHUB_ACTION')) {
    return cb(new SRError(
      'semantic-release didn’t run on Github Action  and therefore a new version won’t be published.\n' +
      'You can customize this behavior using "verifyConditions" plugins: git.io/sr-plugins',
      'ENOGHACTIONS'
    ))
  }

  cb(null)
}
