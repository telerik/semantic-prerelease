const utils = require('./utils');

module.exports = function (pluginConfig, config, cb) {
  let verifyConditions = require('./condition-github-actions');
  const branch = utils.ghActionsBranch(config.env);

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
  return verifyConditions(pluginConfig, config, cb);
};
