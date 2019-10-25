let utils = {};

utils.ghActionsBranch = env => env.GITHUB_REF ? env.GITHUB_REF.split('/').slice(-1)[0] : "";

module.exports = utils;

