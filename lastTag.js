const execSync = require('child_process').execSync;

const lastTag = ({ branch = 'origin/master', dev = true } = {}) => {
  const exclude = dev ? ' --exclude="*dev*"' : '';
  return execSync(`git describe --tags --match "v[0-9]*" ${exclude} --abbrev=0 ${branch} || true`,
      { encoding: 'utf8' }
  ).trim();
};

module.exports = lastTag;
