#!/usr/bin/env node

const fs = require('fs');
const json = fs.readFileSync('package.json', { encoding: 'utf-8' });
const meta = JSON.parse(json);
const deps = Object.assign({}, meta.dependencies, meta.peerDependencies);

Object.keys(deps).forEach((key) => {
    if (deps[key].indexOf('dev') !== -1) {
        process.exit(-1);
    }
});

