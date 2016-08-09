"use strict";
const Path = require("path");
const gulpHelper = require("electrode-gulp-helper");

function setupPath() {
  gulpHelper.envPath.addToFront(Path.resolve("node_modules/.bin"));
  gulpHelper.envPath.addToFront(Path.join(__dirname, "node_modules/.bin"));
}

const tasks = {
  "lint-lib": `eslint -c ${__dirname}/config/eslint/.eslintrc-node lib --color`,
  "lint-test": `eslint -c ${__dirname}/config/eslint/.eslintrc-test test --color`,
  "lint": [["lint-lib", "lint-test"]],
  "test": [["lint-lib", "lint-test", "test-only"]],
  "test-only": `mocha -c --opts ${__dirname}/config/test/mocha.opts test/spec`,
  "test-cov": `istanbul cover -x gulpfile.js --include-all-sources _mocha -- -c --opts ${__dirname}/config/test/mocha.opts test/spec`,
  "test-ci": ["test-cov"],
  "check": ["lint", "test-cov"],
  "check-ci": ["lint", "test-ci"]
};

module.exports = function (gulp) {
  setupPath();
  gulpHelper.loadTasks(tasks, gulp || require("gulp"));
};

