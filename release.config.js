'use strict';

// module.exports = {
export default {
    "debug": false,
    "branchTags": {
      "develop": "dev"
    },
    "fallbackTags": {
      "dev": "latest"
    },
    "analyzeCommits": "./analyzeCommits",
    "generateNotes": "./generateNotes",
    "getLastRelease": "./getLastRelease",
    "verifyConditions": "./verifyConditions",
    "verifyRelease": "./verifyRelease",
    branches: [{
        name: "develop",
        prerelease: true,
        channel: "dev"
    }, {
        name: "master",
        channel: "latest"
    }, {
        name: "npm-vulnerabilities",
        prerelease: true,
        channel: "dev"
    }],
    preset: 'conventionalcommits',
    plugins: [
        '@semantic-release/commit-analyzer',
        [
            '@semantic-release/release-notes-generator',
            {
                preset: 'conventionalcommits',
                releaseRules: [
                    {
                        breaking: true,
                        release: 'major'
                    },
                    {
                        type: 'feat',
                        "message": "*BREAKING CHANGE*",
                        release: 'major'
                    },
                    {
                        type: 'fix',
                        "message": "*BREAKING CHANGE*",
                        release: 'major'
                    },
                    {
                        type: 'feat',
                        release: 'minor',
                    },
                    {
                        type: 'fix',
                        release: 'patch',
                    },
                    // {
                    //     type: 'refactor',
                    //     release: 'patch',
                    // }
                ],
                "parserOpts": {
                    "noteKeywords": [
                        "BREAKING CHANGE",
                        "BREAKING-CHANGE",
                        "BREAKING CHANGES"
                    ]
                },
                presetConfig: {
                    types: [
                        { "type": "feat", "section": "feat" },
                        { "type": "fix", "section": "fix" },
                        { "type": "chore", "hidden": true },
                        { "type": "docs", "hidden": true },
                        { "type": "style", "hidden": true },
                        { "type": "refactor", "hidden": true },
                        { "type": "perf", "hidden": true },
                        { "type": "test", "hidden": true }
                    ],
                }
            }
        ]
    ]
}
