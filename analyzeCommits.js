const analyzeCommits = require('@semantic-release/commit-analyzer')
const SemanticReleaseError = require('@semantic-release/error')
const execSync = require('child_process').execSync;
const lastTag = require('./lastTag');
const utils = require('./utils');

const until = f => array => {
  const first = array[0];

  if (!first || f(first)) {
    return [];
  }

  return [ first, ...until(f)(array.slice(1)) ];
};

const lastTaggedRelease = () => {
  const tag = lastTag({ branch: '', dev: false });
  const args = tag ? `-1 ${tag}` : '--max-parents=0 HEAD';

  return execSync(`git rev-list ${args}`, { encoding: 'utf8' }).trim();
};

module.exports = function (pluginConfig, config, cb) {
  // run standard commit analysis
  return analyzeCommits(pluginConfig, config, function(error, type) {
    const branch = config.env.TRAVIS_BRANCH || config.env.GIT_LOCAL_BRANCH ||  utils.ghParseBranch(config.env.GITHUB_REF);
    const branchTags = config.options.branchTags;
    const distTag = branchTags && branchTags[branch];

    // use default behavior if not publishing a custom dist-tag
    if (!distTag) {
      return cb(error, type);
    }

    let releaseType = type;
    if (type) {
      // map all types of releases to prereleases
      releaseType = {
        'major': 'premajor',
        'minor': 'preminor',
        'patch': 'prepatch'
      }[type] || type;

      console.log("Publishing a " + releaseType + " release.");
    }

    // suppress NPM releases of non-feature commits (chore/docs/etc)
    const lastReleaseHash = lastTaggedRelease();
    const untilLastRelease = until(commit => commit.hash === lastReleaseHash);
    const commits = untilLastRelease(config.commits);
    const commitSubset = Object.assign({}, config, { commits });

    analyzeCommits(pluginConfig, commitSubset, function(_, type) {
      if (!type) {
        // commits since last dist-tag release are empty, suppress release
        return cb(new SemanticReleaseError(
          'There are no relevant changes, so no new version is released.',
          'ENOCHANGE'
        ));
      }

      cb(error, releaseType);
    });
  });
};

