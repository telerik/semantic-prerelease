#!/usr/bin/env node

import { readFileSync } from 'fs';
const json = readFileSync('package.json', { encoding: 'utf-8' });
const meta = JSON.parse(json);
const deps = Object.assign({}, meta.dependencies, meta.peerDependencies);

Object.keys(deps).forEach((key) => {
    if (deps[key].indexOf('dev') !== -1) {
        // "dev" dependencies found, exit with error
        process.exit(1);
    }
});
