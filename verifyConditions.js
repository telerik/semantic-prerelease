import { ghActionsBranch } from './utils.js';
import { verifyConditions } from './condition-github-actions.js';

export default function (pluginConfig, config, cb) {
  const branch = ghActionsBranch(config.env);

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
}
