const defaultLastRelease = require('@semantic-release/last-release-npm');

module.exports = function (pluginConfig, config, cb) {
  let branch;
  let oldTag;

  if (config.env.TRAVIS) {
    branch = config.env.TRAVIS_BRANCH;
  } else {
    branch = config.env.GIT_BRANCH;
  }

  const distTag = config.options.branchTags[branch];
  if (distTag) {
    // use 'latest' dist tag to determine what version will be published
    oldTag = config.npm.tag;
    config.npm.tag = "latest";
  }

  return defaultLastRelease(pluginConfig, config, function(err, res) {
    if (distTag) {
      config.npm.tag = oldTag;
    }
    cb(err, res);
  });
};

