import conventionalChangelog from 'conventional-changelog';
import parseUrl from 'github-url-from-git';
import { lastTag } from './lastTag.js';

export default function (pluginConfig, {pkg}, cb) {
  console.log("============================= generate notes");
  const repository = pkg.repository ? parseUrl(pkg.repository.url) : null
  const from = lastTag();

  conventionalChangelog({
    version: pkg.version,
    repository: repository,
    from: from,
    file: false
  }, cb)
}
