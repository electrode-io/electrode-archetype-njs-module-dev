"use strict";
const Path = require("path");
const gulpHelper = require("electrode-gulp-helper");
const fs = require("fs");

function setupPath() {
  gulpHelper.envPath.addToFront(Path.resolve("node_modules/.bin"));
  gulpHelper.envPath.addToFront(Path.join(__dirname, "node_modules/.bin"));
}

let eslintDir =  `${__dirname}/config/eslint`;
function checkCustomEslint() {
  const customDir = Path.resolve("eslint");
  if (fs.existsSync(customDir)) {
    eslintDir = customDir;
  }
}

checkCustomEslint();

const tasks = {
  "lint-lib": `eslint -c ${eslintDir}/.eslintrc-node lib --color`,
  "lint-test": `eslint -c ${eslintDir}/.eslintrc-test test --color`,
  "lint": [["lint-lib", "lint-test"]],
  "test": [["lint-lib", "lint-test", "test-only"]],
  "test-only": `mocha -c --opts ${__dirname}/config/test/mocha.opts test/spec`,
  "test-cov": `istanbul cover -x gulpfile.js -x **/dist/** --include-all-sources _mocha -- -c --opts ${__dirname}/config/test/mocha.opts test/spec`,
  "test-ci": ["test-cov"],
  "check": ["lint", "test-cov"],
  "check-ci": ["lint", "test-ci"]
};

module.exports = function (gulp) {
  setupPath();
  gulpHelper.loadTasks(tasks, gulp || require("gulp"));
};

