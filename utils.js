let utils = {};

utils.ghActionsBranch = branch => branch.split('/').slice(-1)[0];

module.exports = utils;

