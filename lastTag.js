const execSync = require('child_process').execSync;

const lastTag = () => {
    let sha;

    try {
        sha = execSync(
            'git describe --tags --match "v[0-9]*" --exclude="*dev*" --abbrev=0 origin/master',
            { encoding: 'utf8' }
        ).trim();
    } catch(e) {}

    return sha;
}

module.exports = lastTag;
