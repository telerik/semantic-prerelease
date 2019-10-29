const utils = require('./utils');

module.exports = function (pluginConfig, config, cb) {
  let branch;
  let defaultVerifyConditions;

  if (config.env.TRAVIS) {
    defaultVerifyConditions = require('@semantic-release/condition-travis');
    branch = config.env.TRAVIS_BRANCH;
  } else if (config.env.GITHUB_REF) {
    defaultVerifyConditions = require('./condition-github-actions');
    branch = utils.ghActionsBranch(config.env);
  } else {
    defaultVerifyConditions = require('@krux/condition-jenkins');
    branch = config.env.GIT_LOCAL_BRANCH;
  }

  // update semantic-release configuration to publish:
  // - from this branch
  // - with the specified dist tag
  const distTag = config.options.branchTags[branch];
  if (distTag) {
    console.log(`Enable prerelease on dist-tag '${distTag}'.`);

    config.options.branch = branch;
    config.npm.tag = distTag;
  }

  // run default build checks with the new configuration
  return defaultVerifyConditions(pluginConfig, config, cb);
};
