const analyzeCommits = require('@semantic-release/commit-analyzer')

module.exports = function (pluginConfig, config, cb) {
  // run standard commit analysis
  return analyzeCommits(pluginConfig, config, function(error, type) {
    const branch = config.env.TRAVIS_BRANCH || config.env.GIT_LOCAL_BRANCH;
    const branchTags = config.options.branchTags;
    const distTag = branchTags && branchTags[branch];
    let releaseType = type;

    // if branch publishes a dist-tag
    if (type && distTag) {
      // map all types of releases to prereleases
      releaseType = {
        'major': 'premajor',
        'minor': 'preminor',
        'patch': 'prepatch'
      }[type] || type;

      console.log("Publishing a " + releaseType + " release.");
    }

    cb(error, releaseType);
  });
};

