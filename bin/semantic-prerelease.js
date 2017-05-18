#!/usr/bin/env node

const config = require('../package.json');
const branch = process.env.TRAVIS_BRANCH || process.env.GIT_BRANCH;
const branchTags = config.release && config.release.branchTags;
const tag = branchTags && branchTags[branch];
const dryRun = process.argv.find(arg => /^(--dry-run|-n)$/.test(arg));

let command = [ 'npm', 'publish' ];

if (tag) {
  command.push('--tag', tag);
}

if (!branchTags) {
  console.warn('[WARN] No branch tag configuration');
}

if (dryRun) {
  console.log(command.join(' '));
} else {
  const exec = require('child_process').exec;
  exec(command.join(' '), function(error, stdout, stderr) {
    console.log(stdout);

    if (error) {
      console.error(`[ERROR] npm publish: ${stderr}`);
    }
  });
}
