#!/usr/bin/env node

import { ghActionsBranch } from '../utils.js';
import validateConfig from '../validateConfig.js';
import config from 'package.json';
import { exec } from 'child_process';
const branch = process.env.TRAVIS_BRANCH || process.env.GIT_LOCAL_BRANCH || ghActionsBranch(process.env);
const branchTags = config.release && config.release.branchTags;
const tag = branchTags && branchTags[branch];
const dryRun = process.argv.find(arg => /^(--dry-run|-n)$/.test(arg));
const publicPackage = process.argv.find(arg => /^(--public)$/.test(arg));
const validate = process.argv.find(arg => /^(--validate|-v)$/.test(arg));
const command = ['npm', 'publish'];

function semanticRelease() {
  if (validate) {
    validateConfig(config);
    return;
  }
  // } else {
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
    exec(command.join(' '), function (error, stdout, stderr) {
      console.log(stdout);

      if (error) {
        console.error(`[ERROR] npm publish: ${stderr}`);
        process.exit(1);
      }
    });
  }
}

semanticRelease();
