"use strict";
const shell = require("shelljs");
const Path = require("path");
const gulpLoadTasks = require("@walmart/electrode-gulp-load-tasks");

function setupPath() {
  const nm = Path.resolve("node_modules/.bin");
  if (process.env.PATH && process.env.PATH.indexOf(nm) < 0) {
    process.env.PATH += `:${nm}`;
  }
}

function exec(cmd, cb) {
  const error = (code) => new Error(`command exit code ${code}`);
  if (typeof cb === "function") {
    shell.exec(cmd, (code, stdout, stderr) => {
      cb(code !== 0 ? error(code) : undefined);
    });
  } else {
    return new Promise((resolve, reject) => {
      shell.exec(cmd, (code, stdout, stderr) => {
        code !== 0 ? reject(error(code)) : resolve();
      });
    });
  }
}

const tasks = {
  "lint-lib": () => exec(`eslint -c ${__dirname}/config/eslint/.eslintrc-node lib --color`),
  "lint-test": () => exec(`eslint -c ${__dirname}/config/eslint/.eslintrc-test test --color`),
  "lint": [["lint-lib", "lint-test"]],
  "test": [["lint-lib", "lint-test", "test-only"]],
  "test-only": () => exec(`mocha -c --opts ${__dirname}/config/test/mocha.opts test/spec`),
  "test-cov": () => exec(`istanbul cover --include-all-sources _mocha -- -c --opts ${__dirname}/config/test/mocha.opts test/spec`),
  "test-ci": ["test-cov"],
  "check": ["lint", "test-cov"],
  "check-ci": ["lint", "test-ci"]
};


module.exports = function (gulp) {
  setupPath();
  gulpLoadTasks(tasks, gulp || require("gulp"));
};

