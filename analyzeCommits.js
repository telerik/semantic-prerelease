import SemanticReleaseError from '@semantic-release/error';
import { execSync } from 'child_process';
import { lastTag } from './lastTag.js';
import { ghActionsBranch } from './utils.js';

const until = f => array => {
  const first = array[0];

  if (!first || f(first)) {
    return [];
  }

  return [first, ...until(f)(array.slice(1))];
};

const lastTaggedRelease = () => {
  const tag = lastTag({ branch: '', dev: false });
  const args = tag ? `-1 ${tag}` : '--max-parents=0 HEAD';

  return execSync(`git rev-list ${args}`, { encoding: 'utf8' }).trim();
};

export default async function (pluginConfig, config) {
  let commitAnalyzer = (await import('@semantic-release/commit-analyzer'));
  // run standard commit analysis
  const analyzeCommitsResult = await commitAnalyzer.analyzeCommits(pluginConfig, config);
  const type = analyzeCommitsResult;

  const branch = config.env.TRAVIS_BRANCH || config.env.GIT_LOCAL_BRANCH || ghActionsBranch(config.env);
  const branchTags = config.options.branchTags;
  const distTag = branchTags && branchTags[branch];

  // use default behavior if not publishing a custom dist-tag
  if (!distTag) {
    return type;
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

  const result = await commitAnalyzer.analyzeCommits(pluginConfig, commitSubset)

  if (!type) {
    // commits since last dist-tag release are empty, suppress release
    return new SemanticReleaseError(
      'There are no relevant changes, so no new version is released.',
      'ENOCHANGE'
    );
  }

  return result;
}

