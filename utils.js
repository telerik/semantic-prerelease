let utils = {};

utils.ghParseBranch = branch => branch.split('/').slice(-1)[0];

module.exports = utils;

