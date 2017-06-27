const execSync = require('child_process').execSync;

const lastTag = () => execSync(
    'git describe --tags --match "v[0-9]*" --exclude="*dev*" --abbrev=0 origin/master',
    { encoding: 'utf8' }
).trim();

module.exports = lastTag;
