const defaultLastRelease = require('@semantic-release/last-release-npm');
const lastTag = require('./lastTag');
const utils = require('./utils');
module.exports = function (pluginConfig, config, cb) {
  let branch;
  let oldTag;

  if (config.env.TRAVIS) {
    branch = config.env.TRAVIS_BRANCH;
  } else if (config.env.GITHUB_REF) {
    branch = utils.ghActionsBranch(config.env.GITHUB_REF);
  } else {
    branch = config.env.GIT_LOCAL_BRANCH;
  }

  const distTag = config.options.branchTags[branch];
  if (distTag) {
    console.log("Using 'latest' tag to fetch parent release.");
    // use 'latest' dist tag to determine what version will be published
    oldTag = config.npm.tag;
    config.npm.tag = "latest";
  }

  return defaultLastRelease(pluginConfig, config, function(err, res) {
    if (res && !res.gitHead) {
      res.gitHead = lastTag();
    }

    if (distTag) {
      console.log(`Reverting back to ${oldTag} tag.`);
      config.npm.tag = oldTag;
    }
    cb(err, res);
  });
};

