function validateConfig(config) {
    let valid = true;
    const assert = (msg, rule) => {
        if (!rule()) {
            console.error(msg);
            valid = false;
        }
    };

    const release = config.release;
    assert('Expected to see release section in package.json', () => release);

    assert('Expected to see release.branchTags section in package.json', () =>
        release.branchTags && Object.keys(release.branchTags).length > 0);

    assert('Expected to see release.fallbackTags section in package.json', () =>
        release.branchTags && Object.keys(release.fallbackTags).length > 0);

    ['generateNotes']
        .forEach((plugin) => {
            assert(`Expected release.${ plugin } to be set."`, () => Boolean(release[plugin]));
        });

    ['analyzeCommits', 'getLastRelease', 'verifyConditions', 'verifyRelease']
        .forEach((plugin) => {
            assert(`Expected release.${ plugin } to be set to "@telerik/semantic-prerelease/${ plugin }"`, () =>
                release[plugin] == `@telerik/semantic-prerelease/${ plugin }`);
        });

    if (!valid) {
        process.exit(1);
    }
}

module.exports = validateConfig;
