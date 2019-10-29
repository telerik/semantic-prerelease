#!/usr/bin/env node

const utils = require('../utils');
const path = require('path');
const validateConfig = require('../validateConfig');
const config = require(path.resolve('package.json'));
const branch = process.env.TRAVIS_BRANCH || process.env.GIT_LOCAL_BRANCH || utils.ghActionsBranch(process.env);
const branchTags = config.release && config.release.branchTags;
const tag = branchTags && branchTags[branch];
const dryRun = process.argv.find(arg => /^(--dry-run|-n)$/.test(arg));
const publicPackage = process.argv.find(arg => /^(--public)$/.test(arg));
const validate = process.argv.find(arg => /^(--validate|-v)$/.test(arg));
const command = [ 'npm', 'publish' ];

if (validate) {
    validateConfig(config);
    return;
}

if (tag) {
  command.push('--tag', tag);
}

if (publicPackage) {
  command.push('--access=public');
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
      process.exit(1);
    }
  });
}
