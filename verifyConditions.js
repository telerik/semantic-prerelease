const utils = require('./utils');

module.exports = function (pluginConfig, config, cb) {
  let defaultVerifyConditions;

  if (config.env.TRAVIS) {
    defaultVerifyConditions = require('@semantic-release/condition-travis');
  } else if (config.env.GITHUB_REF) {
    defaultVerifyConditions = require('./condition-github-actions');
  } else {
    defaultVerifyConditions = require('@krux/condition-jenkins');
  }
  
  const branch = config.env.TRAVIS_BRANCH || config.env.GIT_LOCAL_BRANCH ||  utils.ghActionsBranch(config.env);

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
